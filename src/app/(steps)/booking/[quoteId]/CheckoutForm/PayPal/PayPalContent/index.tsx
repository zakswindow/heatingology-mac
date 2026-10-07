"use client";
import Icon, { ICONS } from "@/components/Image/Icons";
import { FUNDING, PayPalButtons } from "@paypal/react-paypal-js";
import { memo } from "react";
import { useRouter } from "next/navigation";
import styles from "./style.module.scss";
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";

type TPayPalContent = { amount: string; quoteId: string; }

function PayPalContent ({ amount, quoteId }: TPayPalContent) {
    const updateQuote = useUpdateQuote();
    const router = useRouter();

    const paypalButtonStyle  = {
        shape: "pill",
        color: "black",
        height: 30
    };

    return (
        <div className={styles.paypalContent}>
            <div className={styles.description}>
                <Icon icon={ICONS.FINANCE} className={styles.icon} />
                {`After clicking ‘Pay Later’ below, you will be redirected to Paypal Credit to complete your application online.`}
            </div>
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            amount: {
                                value: amount,
                                currency_code: "GBP"
                            }
                        }]
                    });
                }}
                onApprove={async () => {
                    await updateQuote.mutateAsync({ id: quoteId, body: { paymentMethod: "PAYPAL" } });
                    router.push(`/status/${quoteId}?payment=paypal&status=complete`);
                }}
                onError={() => {
                    router.push(`/status/${quoteId}?payment=paypal&status=failed`);
                }}
                onCancel={() => {
                    router.push(`/status/${quoteId}?payment=paypal&status=cancelled`);
                }}
                fundingSource={FUNDING.PAYLATER}
                style={paypalButtonStyle}
            />
        </div>
    );
}

export default memo(PayPalContent);