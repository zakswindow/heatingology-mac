"use client";
import Onboard from "./Onboard";
import QuestionnaireForm from "./Questionnaire";
import styles from './style.module.scss';
import { useEffect, useState } from "react";
import { TQuestions } from "./Questionnaire/_types";
import { useGetQuestions } from "./_helper";
import { Product, ProductType } from "@prisma/client";


export default function QuotePageContent ({ productType, boilerExtra, evChargerExtra }: { productType: ProductType, boilerExtra: Product[], evChargerExtra: Product[] }) {
    const [questions, setQuestions] = useState<TQuestions | null>(null);
    const [firstQuestionId, setFirstQuestionId] = useState("");
    const questionsConfig = useGetQuestions(productType, boilerExtra, evChargerExtra);

    async function initQuestions () {
        const { questions, startNode } = questionsConfig;
        if (questions && startNode) {
            setQuestions(questions);
            setFirstQuestionId(startNode);
        }
    }

    function onStart () {
        window.history.pushState(null, '', window.location.href);
        initQuestions();
    }

    function onRestart () {
        sessionStorage.removeItem(`quote_progress_${productType}`);
        setQuestions(null);
        setFirstQuestionId("");
    }

    // Auto-skip Onboard if there is saved progress for this product type
    useEffect(() => {
        if (questions) return;
        const saved = sessionStorage.getItem(`quote_progress_${productType}`);
        if (saved && questionsConfig.questions && questionsConfig.startNode) {
            initQuestions();
        }
    }, [questionsConfig]);

    useEffect(() => {
        if (!questions) return;

        const handlePopState = (e: PopStateEvent) => {
            // Only restart when popping back to the pre-questionnaire entry (null state).
            // Entries pushed per-question have { questionnaire: true } and are handled
            // by the capture-phase listener inside QuestionnaireForm.
            if (!e.state?.questionnaire) {
                onRestart();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [questions]);

    return (
        <main className={styles.page}>
            {
                questions ?
                    <QuestionnaireForm
                        service={productType}
                        questions={questions}
                        startNodeId={firstQuestionId}
                        onRestart={onRestart}
                    />
                    : <Onboard onStart={onStart} productType={productType} />

            }
        </main>
    );
}