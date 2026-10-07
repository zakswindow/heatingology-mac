import { PaymentElement, useCheckout } from "@stripe/react-stripe-js";
import { StripePaymentElementOptions } from "@stripe/stripe-js";
import { useState } from "react";
import PayButton from "../../PayButton";
import styles from "./style.module.scss";
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";

export default function PaymentForm ({ email, quoteId }) {
    const checkout = useCheckout();
    const [selectedPaymentType, setSelectedPaymentType] = useState(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const updateQuote = useUpdateQuote();

    const onSubmit = async (evt) => {
        evt.preventDefault();
        setErrorMessage(null);
        try {
            const result = await checkout.confirm({ email });
            if (result?.error) {
                setErrorMessage(result.error.message ?? "Payment failed. Please try again.");
                return;
            }
            await updateQuote.mutateAsync({ id: quoteId, body: { paymentMethod: "STRIPE" } });
        } catch {
            setErrorMessage("Something went wrong. Please try again.");
        }
    };

    const checkoutOptions: StripePaymentElementOptions = {
        layout: {
            type: "accordion",
            radios: true 
        },
        fields: { billingDetails: { address: "never" } },
        terms: { card: "always" }
    };

    const onPaymentElementChange = (event) => {
        if (event.value?.type) {
            setSelectedPaymentType(event.value.type);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <PaymentElement options={checkoutOptions} onChange={onPaymentElementChange}/>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <PayButton type="submit" label={"Pay Now"} className={styles.pay} />
        </form>
    );
}