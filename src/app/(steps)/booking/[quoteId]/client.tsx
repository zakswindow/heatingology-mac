'use client';
import styles from "./style.module.scss";
import Cart from "../../_components/Cart";
import BookingForm from "./BookingForm";
import { useCallback, useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { BookingContextProvider } from "./_context";
import StepHeader from "../../_components/Header";
import { PURCHASE_JOURNEY, STEPS } from "../../_components/Header/config";
import Faqs from "@/components/Section/Faqs";
import { FAQS } from "@/app/(pages)/faqs/_config";
import HaveQuestions from "@/components/Section/HaveQuestions";
import CheckoutForm from "./CheckoutForm";
import { useRouter } from "next/navigation";
import { Product, ProductType, Quote } from "@prisma/client";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import Loading from "@/app/loading";
import CartBar from "../../_components/CartModal/CartBar";
import CustomiseForm from "./Customise";
import classNames from "classnames";
import BookingTitle from "./Title";

type TBookingClient = { quoteData: Quote & { products: Product[] }, initialStep?: string }

export default function BookingClient ({ quoteData, initialStep }: TBookingClient) {
    const journey = PURCHASE_JOURNEY[quoteData.productType] || PURCHASE_JOURNEY.DEFAULT;
    const [curStep, setCurStep] = useState(() => {
        if (initialStep) {
            const match = journey.find((s) => s.title.toLowerCase() === initialStep.toLowerCase());
            if (match) return match;
        }
        return journey[0];
    });
    const router = useRouter();
    const { isLoading: isMediaQueriesLoading, isMobile } = useMediaQueries();
    const [isCartVisible, setIsCartVisible] = useState(false);
    const [isCustomiseReady, setIsCustomiseReady] = useState(false);
    const [isContactReady, setIsContactReady] = useState(false);
    const [isBookingReady, setIsBookingReady] = useState(false);

    const onNextStep = useCallback(() => {
        // TODO: Refine it to use index.
        if (curStep === STEPS.BOOKING) {
            setCurStep(STEPS.CONTACT);
        } else if (curStep === STEPS.CONTACT) {
            setCurStep(STEPS.PAYMENT);
        } else if (curStep === STEPS.CUSTOMISE) {
            setCurStep(STEPS.BOOKING);
        }
    }, [curStep]);

    const onChangeInstallDate = useCallback(() => {
        setCurStep(STEPS.BOOKING);
    }, []);

    const onChangePackage = useCallback(() => {
        router.push(`/packages/${quoteData.id}`);
    }, [router, quoteData.id]);

    const onPrevStep = useCallback(() => {
        const curStepIndex = journey.findIndex((step) => step.title === curStep.title);
        if (curStepIndex === 0) {
            router.back();
        } else {
            setCurStep(journey[curStepIndex - 1]);
        }
    }, [curStep, journey, router]);

    useEffect(() => {
        if (curStep.title === STEPS.CUSTOMISE.title) {
            setIsCartVisible(false);
        } else {
            setIsCartVisible(true);
        }
    }, [curStep]);

    if (!quoteData) {
        throw new Error("fail");
    }

    if (isMediaQueriesLoading) {
        return (<Loading />);
    }

    return (
        <BookingContextProvider>
            <div className={styles.page}>
                <StepHeader
                    className={styles.header}
                    curStep={curStep}
                    productType={quoteData.productType}
                    onBack={onPrevStep}
                >
                    {curStep === STEPS.CONTACT && <BookingTitle title="Your details" continue={{ visible: true, enable: isContactReady, formId: "contact-form" }} />}
                    {curStep === STEPS.BOOKING && <BookingTitle title="Pick your install date" continue={{ visible: true, enable: isBookingReady, formId: "booking-form" }} />}
                </StepHeader>
                <section className={classNames(styles.main, { [styles.cartView]: isCartVisible })}>
                    {
                        curStep === STEPS.CUSTOMISE &&
                        <CustomiseForm quoteId={quoteData.id} onContinue={onNextStep} onReadyChange={setIsCustomiseReady} />
                    }
                    {
                        curStep === STEPS.CONTACT &&
                        <ContactForm quoteId={quoteData.id} onContinue={onNextStep} onReadyChange={setIsContactReady} />
                    }
                    {
                        curStep === STEPS.BOOKING &&
                        <BookingForm quoteId={quoteData.id} onContinue={onNextStep} onReadyChange={setIsBookingReady} />
                    }
                    {
                        curStep === STEPS.PAYMENT &&
                        <CheckoutForm quoteId={quoteData.id} />
                    }
                    {isMobile ? (
                        (isCartVisible || curStep === STEPS.CUSTOMISE) &&
                        <CartBar
                            quoteId={quoteData.id}
                            className={styles.cartBar}
                            onContinue={onNextStep}
                            continue={{
                                visible: curStep !== STEPS.PAYMENT,
                                enable: curStep === STEPS.CUSTOMISE ? isCustomiseReady : curStep === STEPS.CONTACT ? isContactReady : curStep === STEPS.BOOKING ? isBookingReady : true,
                                formId: curStep === STEPS.CUSTOMISE ? "customise-form" : curStep === STEPS.CONTACT ? "contact-form" : curStep === STEPS.BOOKING ? "booking-form" : undefined,
                            }}
                            dialogContent={
                                <Cart
                                    className={styles.section}
                                    quoteId={quoteData.id}
                                    quoteData={quoteData}
                                    curStep={curStep}
                                    onChange={{
                                        onChangeInstallDate,
                                        onChangePackage
                                    }}
                                />
                            }
                        />
                    ) : (
                        isCartVisible &&
                        <Cart
                            className={styles.section}
                            quoteId={quoteData.id}
                            quoteData={quoteData}
                            curStep={curStep}
                            onChange={{
                                onChangeInstallDate,
                                onChangePackage
                            }}
                        />
                    )}
                </section>
                {
                    curStep !== STEPS.PAYMENT &&
                        <Faqs className={styles.faqs} faqs={FAQS.slice(0, 5)} showViewAll={false} />
                }
                <HaveQuestions className={styles.moreQuestions} /> 
            </div>
        </BookingContextProvider>
    );
}