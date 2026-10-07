"use client";
import { format } from "date-fns";
import styles from "./style.module.scss";
import DescriptionItem from "@/components/Texts/DescriptionItem";
import NoteCard from "@/components/Card/NoteCard";
import Email from "@/components/Anchor/Email";
import HaveQuestions from "@/components/Section/HaveQuestions";
import { ICONS } from "@/components/Image/Icons";
import { ANIMATIONS } from "@/lib/_imageMap";
import Animation from "@/components/Animation";
import StepHeader from "@/app/(steps)/_components/Header";
import { STEPS } from "@/app/(steps)/_components/Header/config";
import Faqs from "@/components/Section/Faqs";
import { FAQS } from "@/app/(pages)/faqs/_config";
import { useEmailCompany, useEmailInvoice } from "@/lib/_mutations/checkout.mutate";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";
import { useEffect, useState } from "react";

type TConfirmPage = {
    quoteId: string;
}

export default function ConfirmPage ({ quoteId }: TConfirmPage) {
    const emailInvoice = useEmailInvoice();
    const companyEmail = useEmailCompany();
    const { data: quoteResponse, isLoading: isQuoteLoading, isError: isQuoteError } = useGetQuoteById({ id: quoteId });
    const [ confirmationSent, setConfirmationSent ] = useState(false);

    useEffect(() => {
        if (quoteResponse && quoteResponse.result && !confirmationSent) {
            const { result: quoteData } = quoteResponse;
            emailInvoice.mutateAsync({
                to: quoteData.email,
                quoteId: quoteData.id
            });
            companyEmail.mutateAsync({
                to: quoteData.email,
                quoteId: quoteData.id
            })
            setConfirmationSent(true);
        }
    }, [emailInvoice, quoteResponse, confirmationSent]);

    if (isQuoteLoading) {
        return <Loading />;
    }

    if (isQuoteError) {
        throw new Error("Fail to load the page.");
    }

    if (quoteResponse && quoteResponse.result) {
        const { result: quoteData } = quoteResponse;
        console.log("[[[ quoteData: ", quoteData);
        return (
            <>
                <StepHeader curStep={STEPS.DONE} productType={quoteData.productType} />
                <main aria-label="Order Confirmation" className={styles.page}>
                    <Animation src={ANIMATIONS.ORDER_CONFIRM} />
                    <h1> Your order is confirmed! </h1>
                    <div className={styles.subHeader}>
                        <div> { `Order Number: ${quoteId}`} </div>
                        {
                            quoteData?.updatedAt &&
                    <div> { `Order Date: ${format(quoteData.updatedAt, "do MMMM yyyy")}`}</div>
                        }
                    </div>
                    <div className={styles.bodyText}>
                        {
                            quoteData.email &&
                        <p>{`A confirmation email has been sent to you at `}
                            <Email email={quoteData.email} />
                        </p>
                        }
                        <p>{`Our engineer will contact you 24 hours before your installation.`}</p>

                    </div>
                    <section aria-label="Booking Info" className={styles.infoBox}>
                        <header className={styles.header}> Booking information </header>
                        <DescriptionItem
                            className={styles.description}
                            label="Order summary"
                            value="1x Viessmann Vitodens 050-W, Gas safe installation, 1x System Flush, 1x Magnetic Boiler Filter"
                        />
                        {
                            (quoteData?.price || quoteData?.extraPrice) &&
                        <DescriptionItem
                            className={styles.description}
                            label="Total"
                            value={`£${(quoteData?.price + quoteData?.extraPrice).toFixed(2)}`}
                        />
                        }
                        {
                            quoteData?.installDate &&
                        <DescriptionItem
                            className={`${styles.description} ${styles.noBorder}`}
                            label="Selected Installation Date"
                            value={format(quoteData.installDate, "do MMM yyyy")}
                        >
                            <NoteCard icon={ICONS.DELIVERY_TRUCK} className={styles.note}> 
                                Your installation should take 1-2 days to complete
                                {
                                    quoteData.installTime ?
                                        `, and our installer will be on stie in the ${quoteData.installTime.toLowerCase()}.`
                                        : "."
                                }
                            </NoteCard>
                        </DescriptionItem>
                        }
                    </section>
                    <section aria-label="Payment" className={styles.infoBox}>
                        <header className={styles.header}> Payment </header>
                        {
                            (quoteData?.firstName || quoteData?.lastName) &&
                        <DescriptionItem
                            className={styles.description}
                            label="Name:"
                            value={`${quoteData?.firstName} ${quoteData?.lastName}`}
                        />
                        }
                        {
                            quoteData?.email &&
                    <DescriptionItem
                        className={styles.description}
                        label="Billing to:"
                        value={quoteData.email}
                    />
                        }
                        {
                            quoteData.paymentMethod &&
                            <DescriptionItem
                                className={`${styles.description} ${styles.noBorder}`}
                                label="Payment method:"
                                value={quoteData.paymentMethod}
                            />
                        }
                    </section>
                </main>
                <HaveQuestions className={styles.moreQuestions} title="Any questions?" />
                <Faqs className={styles.faqs} faqs={FAQS.slice(0, 5)} showViewAll={false} />
            </>
        );
    }
}