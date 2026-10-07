import { Product } from "@prisma/client";
import { validatePostcode } from "@/lib/_queries/postcode.query";
import { BOILER_QUESTIONS } from "./configs/boiler/config";
import { ANSWER_TYPES, TAnswer, TQuestions } from "./_types";

type TGetButtons = {
    exit: boolean;
    next?: string;
    nextDisabled?: boolean;
    onBack: () => void;
    onRestart: () => void;
    onNext: () => void;
}

export function getButtons ({ exit, next, nextDisabled, onRestart, onBack, onNext }: TGetButtons) {
    const buttons = [];

    buttons.push({
        label: exit ? "Restart" : "Back",
        action: exit ? onRestart : onBack,
        variant: exit ? "transparent" : "default"
    });

    if (next) {
        buttons.push({
            label: next,
            action: onNext,
            disabled: nextDisabled
        });
    }
   
    return buttons;
}

export async function onValidatePostcode (postcode: string) {
    return validatePostcode(postcode);
}

type TSubmittedAnswers = Record<
    string,
    { fieldName: string; inputValue: unknown; option: TAnswer; question: string; type?: ANSWER_TYPES; }
>

export function getBoilerQuestions (boilerExtra: Product[]) {
    if (boilerExtra && boilerExtra.length > 0) {
        BOILER_QUESTIONS["BOILER_Q09"] = {
            id: "BOILER_Q09",
            content: 'Where do you want your boiler to be located?',
            fieldName: "newBoilerLocate",
            answers: boilerExtra.map((item: Product) => ({
                content: item.model,
                nextNode: "BOILER_Q10",
                priceTag: item.priceWithVat,
                value: item.id,
                icon: item.productImage
            }))
        };
    }
    return BOILER_QUESTIONS;
}

// BFS: minimum number of questions remaining from currentNode to a terminal action (inclusive).
export function getShortestRemainingSteps(questions: TQuestions, currentNode: string): number {
    const visited = new Set<string>();
    const queue: Array<[string, number]> = [[currentNode, 1]];

    while (queue.length > 0) {
        const [node, depth] = queue.shift()!;

        if (visited.has(node)) continue;
        visited.add(node);

        const question = questions[node];
        if (!question || !question.answers?.length) return depth;

        for (const answer of question.answers) {
            const next = answer.nextNode;
            // Terminals: null, numeric ACTIONS enum value, or a key not in the graph
            if (next === null || typeof next === 'number' || !questions[next as string]) {
                return depth;
            }
            if (!visited.has(next as string)) {
                queue.push([next as string, depth + 1]);
            }
        }
    }

    return 1;
}

export function getBodyContent (submittedAnswers: TSubmittedAnswers) {
    const bodyContent = Object.values(submittedAnswers).reduce((
        acc,
        { fieldName, inputValue, question, type },
        index
    ) => {
        return ({
            ...acc,
            [fieldName]: {
                question,
                inputValue,
                order: index,
                ...(type === ANSWER_TYPES.IMAGE_UPLOAD && { excludeFromBreakdown: true })
            }
        });
    }, {});

    return bodyContent;
}

export function getPriceTagProducts (submittedAnswers: TSubmittedAnswers): { id: string }[] {
    return Object.values(submittedAnswers)
        .filter(({ option }) => option.priceTag && option.priceTag > 0 && typeof option.value === "string")
        .map(({ option }) => ({ id: option.value as string }));
}