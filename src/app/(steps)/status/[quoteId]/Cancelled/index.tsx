"use client";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import { STEPS } from "@/app/(steps)/_components/Header/config";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";
import StepHeader from "@/app/(steps)/_components/Header";
import HaveQuestions from "@/components/Section/HaveQuestions";
import Faqs from "@/components/Section/Faqs";
import { FAQS } from "@/app/(pages)/faqs/_config";

type TCancelledPage = {
    quoteId: string;
}

export default function CancelledPage({ quoteId }: TCancelledPage) {
    const router = useRouter();
    const { data: quoteResponse, isLoading: isQuoteLoading, isError: isQuoteError } = useGetQuoteById({ id: quoteId });

    if (isQuoteLoading) {
        return <Loading />;
    }

    if (isQuoteError) {
        throw new Error("Fail to load the page.");
    }

    if (quoteResponse && quoteResponse.result) {
        const { result: quoteData } = quoteResponse;
        return (
            <>
            <StepHeader curStep={STEPS.DONE} productType={quoteData.productType} />
            <main aria-label="Transaction Cancelled" className={styles.page}>
                <div className={styles.iconCircle}>
                    <Icon icon={ICONS.CROSS} className={styles.crossIcon} />
                </div>
                <h1>The transaction is cancelled.</h1>
                <p className={styles.body}>
                    Your card transaction was declined. Please check your card details or try another payment method.
                </p>
                <Button className={styles.button} onClick={() => router.push(`/booking/${quoteId}?step=payment`)}>
                    Back to payment &rarr;
                </Button>
            </main>
            <HaveQuestions className={styles.moreQuestions} title="Any questions?" />
            <Faqs className={styles.faqs} faqs={FAQS.slice(0, 5)} showViewAll={false} />

            </>
        );
    }
}
