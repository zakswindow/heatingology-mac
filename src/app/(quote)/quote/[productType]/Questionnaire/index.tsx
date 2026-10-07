'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ACTIONS, ANSWER_TYPES, TAnswer, TQuestions } from "./_types";
import styles from './style.module.scss';
import { useCreateQuote } from "@/lib/_mutations/quote.mutate";
import { useRouter } from "next/navigation";
import { ProductType } from "@prisma/client";
import SaveQuoteDialog from "@/components/Dialog/Modal/SaveQuote";
import { TSaveQuoteContent } from "@/components/Dialog/Modal/SaveQuote/Content";
import RequestSurveyDialog from "@/components/Dialog/Modal/RequestSurvey";
import { parseCreateScreenContent } from "../_helper";
import Footer from "./Footer";
import { getBodyContent, getButtons, onValidatePostcode, getShortestRemainingSteps, getPriceTagProducts } from "./_helpers";
import Answer from "./Answer";
import GenerateDialog from "@/components/Dialog/Modal/Generate";
import Question from "./Question";
import classNames from "classnames";
import ProgressBar from "./ProgressBar";
import InfoText from "./Question/InfoText";
import Icon, { ICONS } from "@/components/Image/Icons";

type TQuestionnaireForm = {
    questions: TQuestions;
    startNodeId: string;
    service: ProductType;
    onRestart: (service: ProductType) => void;
}

type TSubmittedAnswers = Record<
    string,
    { fieldName: string; inputValue: unknown; option: TAnswer; question: string; type?: ANSWER_TYPES; }
>

const QuestionnaireForm = ({ questions, startNodeId, service, onRestart }: TQuestionnaireForm) => {
    const storageKey = `quote_progress_${service}`;

    const getSaved = () => {
        try {
            const raw = sessionStorage.getItem(storageKey);
            return raw ? JSON.parse(raw) : null;
        } catch { return null; }
    };

    const [currentNode, setCurrentNode] = useState<string>(() => getSaved()?.currentNode ?? startNodeId);
    const [history, setHistory] = useState<string[]>(() => getSaved()?.history ?? [startNodeId]);
    const [showDialog, setShowDialog] = useState<ACTIONS | null>(null);
    const [dialogData, setDialogData] = useState({});

    const [textInput, setTextInput] = useState<{ option: TAnswer, inputValue: string; } | null>(null);
    const [answers, setAnswers] = useState<TSubmittedAnswers>(() => getSaved()?.answers ?? {});
    const [textInputError, setTextInputError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const isGoingBack = useRef(false);

    // Persist progress on every navigation or answer change
    useEffect(() => {
        try {
            sessionStorage.setItem(storageKey, JSON.stringify({ currentNode, history, answers }));
        } catch {}
    }, [currentNode, history, answers]);

    useEffect(() => {
        setSearchQuery("");
    }, [currentNode]);

    // Keep browser history in sync so the back button navigates between questions.
    // Push a new entry on every forward navigation so there is always something to pop.
    useEffect(() => {
        if (!isGoingBack.current) {
            window.history.pushState({ questionnaire: true }, '', window.location.pathname);
        }
        isGoingBack.current = false;
    }, [currentNode]);

    const createQuote = useCreateQuote();
    const router = useRouter();

    const curQuestion = useMemo(() => {
        return questions[currentNode];
    }, [currentNode, questions]);

    const displayedAnswers = useMemo(() => {
        if (!curQuestion.searchable || !searchQuery.trim()) return curQuestion.answers;
        const q = searchQuery.toLowerCase();
        const fallback = curQuestion.answers?.find(item => item.searchLabel === "?");
        const matched = curQuestion.answers?.filter(item => {
            if (item.searchLabel === "?") return false;
            const label = (item.searchLabel || item.content || "").toLowerCase();
            return label.includes(q);
        });
        if (!matched?.length && fallback) return [fallback];
        return fallback ? [...(matched ?? []), fallback] : matched;
    }, [curQuestion, searchQuery]);

    const onSubmit = async (quoteContent: TSubmittedAnswers) => {
        const bodyContent = getBodyContent(quoteContent);
        const products = getPriceTagProducts(quoteContent);
        try {
            return await createQuote.mutateAsync({
                body: parseCreateScreenContent({
                    content: bodyContent,
                    service,
                    products
                })
            });
        } catch (e) {
            console.error(e);
        }
    };

    const onOptionClick = useCallback(async ({ option: item, inputValue } : { option: TAnswer, inputValue?: string }) => {
        const answer = inputValue || (item.value === undefined ? item.content : item.value );
        const updatedAnswers: TSubmittedAnswers = { ...answers };
        const { fieldName = "" } = curQuestion;

        if (fieldName) {
            updatedAnswers[currentNode] = {
                option: item,
                question: curQuestion.content,
                inputValue: answer,
                fieldName,
                type: curQuestion.type
            };

            setAnswers((prev) => ({
                ...prev,
                [currentNode]: {
                    option: item,
                    question: curQuestion.content,
                    inputValue: answer,
                    fieldName,
                    type: curQuestion.type
                }
            }));
        }

        const { nextNode } = item;

        if (nextNode === ACTIONS.SHOW_RESULSTS) {
            const { success, result, error } = await onSubmit(updatedAnswers);
            if (success && result) {
                sessionStorage.removeItem(storageKey);
                setShowDialog(nextNode);
                setDialogData({
                    quoteId: result.id,
                    productType: service
                });
            } else {
                alert(`Error: ${error}`);
            }
        } else if (nextNode === ACTIONS.MODAL_SAVE_QUOTE) {
            const { success, result, error } = await onSubmit(updatedAnswers);
            if (success && result) {
                sessionStorage.removeItem(storageKey);
                setShowDialog(nextNode);
                setDialogData({ screenId: result.id });
            } else  {
                alert(`Fail to show Save Quote dialog: ${error}`);
            }
        } else if (nextNode === ACTIONS.BOOKING) {
            const { success, result, error } = await onSubmit(updatedAnswers);
            if (success && result) {
                sessionStorage.removeItem(storageKey);
                router.push(`/booking/${result.id}`);
            } else {
                alert(`Fail to book: ${error}`);
            }
        } else if (nextNode === ACTIONS.CALLBACK) {
            setShowDialog(ACTIONS.CALLBACK);
        } else if (nextNode === ACTIONS.CALL_US) {
            const a = document.createElement('a');
            a.href = `tel:${item.phoneNumber}`;
            a.click();
        } else if (nextNode === ACTIONS.GO_HOME) {
            router.replace(`/`);
        }  else if (nextNode) {
            setHistory(prev => [...prev, nextNode]);
            setCurrentNode(nextNode);
        }
    }, [curQuestion]);

    const onBackClick = useCallback(() => {
        if (history!.length > 1) {
            const newHistory = [...history];
            newHistory.pop();
            const previousNode = newHistory[newHistory.length - 1];

            setHistory(newHistory);
            setCurrentNode(previousNode);
            setTextInput(null);
            setTextInputError(null);
        } else {
            window.location.reload();
        }
    }, [history]);

    useEffect(() => {
        const handlePopState = () => {
            if (history.length > 1) {
                // Synchronously restore the URL before Next.js's bubble-phase handler runs
                window.history.pushState({ questionnaire: true }, '', window.location.pathname);
                isGoingBack.current = true;
                onBackClick();
            }
            // At first question: let browser navigate naturally away from the questionnaire
        };
        // Capture phase fires before Next.js's bubble-phase popstate listener
        window.addEventListener('popstate', handlePopState, true);
        return () => window.removeEventListener('popstate', handlePopState, true);
    }, [history, onBackClick]);

    const onRestartClick = useCallback(() => {
        sessionStorage.removeItem(storageKey);
        setHistory([startNodeId]);
        setCurrentNode(startNodeId);
        onRestart(service);
    }, [service, startNodeId, onRestart]);

    const isComplete = curQuestion?.exit || curQuestion.answers?.find((item) => item.nextNode === ACTIONS.SHOW_RESULSTS);

    const remaining = useMemo(
        () => getShortestRemainingSteps(questions, currentNode),
        [questions, currentNode]
    );
    const answeredCount = history.length - 1;
    const estimatedTotal = answeredCount + remaining;

    return (
        <>
            <ProgressBar
                curPos={answeredCount}
                total={estimatedTotal}
                isEnd={Boolean(isComplete)}
                isStart={history.length === 1}
            />
            <section
                aria-label="questionaire"
                className={classNames(styles.questionaire, { [styles.textInput]: curQuestion.type === ANSWER_TYPES.POSTCODE })}>
                <Question question={curQuestion} />
                <div className={classNames(styles.answers, { [styles.searchableAnswers]: curQuestion.searchable })}>
                    {curQuestion.searchable && (
                        <div className={styles.searchInputWrapper}>
                            <Icon className={styles.searchIcon} icon={ICONS.SEARCH} />
                            <input
                                type="text"
                                className={styles.searchInput}
                                placeholder="Type your manufacturer..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    )}
                    {
                        displayedAnswers?.map((item, index) => {
                            return <Answer
                                question={curQuestion}
                                answer={answers[currentNode]}
                                key={`${curQuestion.content}-${index}`}
                                item={item}
                                error={textInputError}
                                onClick={async () => onOptionClick({ option: item })}
                                onChange={(evt) => {

                                    setTextInput({
                                        option: item,
                                        inputValue: evt.target.value
                                    });
                                }}

                            />;
                        })
                    }
                </div>
                {
                    curQuestion.info &&
                        <InfoText question={curQuestion} />
                }
            
            </section>
            <Footer
                curQuestion={curQuestion}
                productType={service}
                buttons={getButtons({
                    exit: Boolean(curQuestion.exit),
                    next: curQuestion.nextButton,
                    nextDisabled: (
                        (curQuestion.type === ANSWER_TYPES.POSTCODE || curQuestion.type === ANSWER_TYPES.TEXT_INPUT || curQuestion.type === ANSWER_TYPES.NUMBER_INPUT) && !textInput?.inputValue && !answers[currentNode]?.inputValue
                    ) || (
                        curQuestion.type === ANSWER_TYPES.IMAGE_UPLOAD && (!textInput?.inputValue || !(textInput.inputValue as string[]).length)
                    ),
                    onBack: onBackClick,
                    onRestart: onRestartClick,
                    onNext: async () => {
                        const curAnswer = answers[currentNode] || textInput;

                        if (curQuestion.type === ANSWER_TYPES.IMAGE_UPLOAD) {
                            const defaultItem = curQuestion.answers![0];
                            onOptionClick({ option: defaultItem, inputValue: textInput?.inputValue });
                            setTextInput(null);
                            setTextInputError(null);
                        } else if (curQuestion.type === ANSWER_TYPES.POSTCODE) {
                            const postcode = curAnswer && curAnswer.inputValue;
                            const errorMessage = "Please enter a valid postcode.";

                            if (!postcode) {
                                setTextInputError(errorMessage);
                                return;
                            }

                            const { result } = await onValidatePostcode(postcode as string);
                            const error = result ? null : errorMessage;
                            setTextInputError(error);

                            if (!result) {
                                setTextInputError(errorMessage);
                                return;
                            }
                            onOptionClick(curAnswer);
                            setTextInput(null);
                            setTextInputError(null);

                        } else if (textInput) {
                            onOptionClick(textInput);
                            setTextInput(null);
                            setTextInputError(null);
                        } else {
                            onOptionClick(curAnswer ?? { option: curQuestion.answers![0] });
                            setTextInput(null);
                            setTextInputError(null);
                        }
                    }
                })}
            />

            <SaveQuoteDialog 
                rootProps={{ open: showDialog === ACTIONS.MODAL_SAVE_QUOTE }}
                dialogData={dialogData as TSaveQuoteContent}
            />
            <GenerateDialog
                rootProps={{ open: showDialog === ACTIONS.SHOW_RESULSTS }}
                dialogData={dialogData}
            />
            <RequestSurveyDialog
                contactOnly
                rootProps={{ open: showDialog === ACTIONS.CALLBACK, onOpenChange: (open) => { if (!open) setShowDialog(null); } }}
            />
        </>
    );
};

export default QuestionnaireForm;