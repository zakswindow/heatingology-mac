"use client";
import Divider from "@/components/Divider";
import StripeCheckout from "./Stripe";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";
import { useCallback, useState } from "react";
import { PAYMENTS } from "./_types";
import Accordion from "@/components/Accordion";
import KandaTrigger from "./Kanda/KandaTrigger";
import KandaContent from "./Kanda/KandaContent";
import PayPalTrigger from "./PayPal/PaypalTrigger";
import PayPalContent from "./PayPal/PayPalContent";
import { PayPalScriptProvider, ReactPayPalScriptOptions } from "@paypal/react-paypal-js";
import styles from "./style.module.scss";
import PaymentFaqs from "./Faqs";
import { featuresFlag } from "@/lib/_features";

export default function CheckoutForm ({ quoteId }) {
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });
    const [selectedPayment, setSelectedPayment] = useState<PAYMENTS>(PAYMENTS.UNKNOWN);
    
    const onSelect = useCallback((value: string | string[]) => {
        setSelectedPayment(value as PAYMENTS);
    }, []);

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";
    
    const checkoutOptions: ReactPayPalScriptOptions = {
        clientId: paypalClientId,
        components: "buttons,messages,funding-eligibility",
        enableFunding: "credit,paylater",
        currency: "GBP",
        intent: "capture",
        locale: "en_GB",
        ...(process.env.NODE_ENV !== "production" && { buyerCountry: "GB" })
    };
    

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Failed to checkout.");
    }

    if (quoteResponse) {
        const { result: quoteData } = quoteResponse;

        return (
            <section className={styles.container}>
                <div className={styles.description}>
                    <dt> {`How would you like to pay?`} </dt>
                    <dd> {`Your total price: £${quoteData.price.toFixed(2)}`} </dd>
                </div>
                <StripeCheckout quoteData={quoteData} />
                <Divider text={"Or"} />
                {/* TODO: Show Or Hide payment options if amount is not eligible for the option. */}
                <PayPalScriptProvider
                    options={checkoutOptions}
                >
                    <Accordion
                        onValueChange={onSelect}
                        type="single"
                        className={styles.accordion}
                        showChervon={false}
                        headerClassName={styles.accordionHeader}
                        itemClassName={styles.accordionItem}
                        contentClassName={styles.accordionContent}
                        data={[
                            ...(featuresFlag.kanda ? [{
                                value: PAYMENTS.KANDA,
                                trigger: <KandaTrigger isSelected={selectedPayment === PAYMENTS.KANDA} />,
                                content: <KandaContent quoteData={quoteData} />
                            }] : []),
                            {
                                value: PAYMENTS.PAYPAL,
                                trigger: <PayPalTrigger isSelected={selectedPayment === PAYMENTS.PAYPAL} />,
                                content: <PayPalContent amount={(quoteData.price + quoteData.extraPrice).toFixed(2)} quoteId={quoteData.id} />
                            }
                        ]}
                    />
                </PayPalScriptProvider>
                <PaymentFaqs />
            </section>
        );
    }
}