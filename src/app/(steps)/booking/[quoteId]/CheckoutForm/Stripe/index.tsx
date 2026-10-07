"use client";
import { CheckoutProvider, PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { Appearance, loadStripe, StripePaymentElementOptions } from "@stripe/stripe-js";
import { colors } from "@/styles/colors";
import { getUrl } from "@/lib/_api";
import PayButton from "../PayButton";
import styles from "./style.module.scss";
import PaymentForm from "./PaymentForm";

const appearance: Appearance = {
    theme: 'flat',
    labels: "floating",
    variables: {
        colorPrimary: "#342889",
        colorBackground: "#FFF",
        fontWeightNormal: "400",
        fontWeightBold: "600",
        fontSizeBase: "12px"

    },
    rules: {
        '.AccordionItem': { border: `1px solid ${colors.baseNeutralLighter}` },
        '.AccordionItem--selected': { 
            border: `2px solid ${colors.brandDeepViolet}`,
            backgroundColor: colors.surfaceCardInfo
        },
        '.AccordionItem .Text': { fonstSize: '12px' },
        '.Input': {
            border: `1px solid ${colors.border}`,
            backgroundColor: colors.white,
            padding: "0.5rem 1rem",
            fontSize: '12px'
        },
        '.RadioIconOuter': { stroke: colors.brandLuminousBlue },
        '.RadioIconInner': { stroke: colors.brandLuminousBlue }
    }
};


export default function StripeCheckout ({ quoteData }) {
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY!);
    const url = getUrl("/payments/checkout");

    const fetchClientSecret = () => {
        return fetch(url, {
            method: 'POST', 
            body: JSON.stringify({
                products: quoteData.products,
                quoteId: quoteData.id 
            })
        })
            .then((res) => res.json())
            .then((res) => res.clientSecret);
    };

    return (
        <CheckoutProvider
            stripe={stripePromise}
            options={{
                fetchClientSecret,
                elementsOptions: { appearance }
            }}
        >
            <PaymentForm email={quoteData.email} quoteId={quoteData.id} />
        </CheckoutProvider>
    );
    
}