import { QUESTIONNAIRE_IMAGES } from "./ImageIcon";
import { EXPLANATION_CONTENT } from "./Question/Explanation/_helper";

export type TAnswer = {
    content?: string;
    icon?: QUESTIONNAIRE_IMAGES | string;
    nextNode: ACTIONS | string | null;
    priceTag?: number;
    answerProps?: Record<string, React.ReactNode>;
    value?: unknown,
    nextButton?: string;
    phoneNumber?: string;
    searchLabel?: string;
    tooltip?: {
        title?: string;
        content: string;
    };
}

export type TQuestion = {
    _comment?: string;
    id: string;
    type?: ANSWER_TYPES;
    icon?: QUESTIONNAIRE_IMAGES | "",
    label?: string;
    content: string;
    fieldName?: string;
    nextButton?: string;
    answers: TAnswer[] | null;
    help?: string[];
    searchable?: boolean;
    explanation?: {
        label: string;
        content: string;
    },
    info?: { title?: string; content: string; phone?: string; image?: QUESTIONNAIRE_IMAGES; mobileOnly?: boolean; },
    exit?: boolean;
}

export type TQuestions = Record<string, TQuestion>

export enum ACTIONS {
    SUBMIT,
    SHOW_RESULSTS,
    MODAL_SAVE_QUOTE,
    BOOKING,
    BUY_NEW_BOILER,
    SUBMIT_POSTCODE,
    CALLBACK,
    CALL_US,
    GO_HOME
}

export enum ANSWER_TYPES {
    POSTCODE,
    TEXT_INPUT,
    NUMBER_INPUT,
    IMAGE_UPLOAD
}