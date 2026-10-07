"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getPlan } from "@/lib/data/heatassure-plans";
import { trackEvent } from "@/lib/analytics";
import style from "../style.module.scss";

const steps = ["Choose Plan", "Your Details", "Payment", "Confirmation"];

export default function HeatAssureCheckoutPayment() {
    const searchParams = useSearchParams();
    const planKey = searchParams.get("plan") ?? "plus";
    const plan = getPlan(planKey);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const onPay = async () => {
        setLoading(true);
        setError(null);
        try {
            const customerEmail = sessionStorage.getItem("ha_email") ?? undefined;
            const customerName = sessionStorage.getItem("ha_name") ?? undefined;
            const phone = sessionStorage.getItem("ha_phone") ?? undefined;
            const postcode = sessionStorage.getItem("ha_postcode") ?? undefined;
            const address = sessionStorage.getItem("ha_address") ?? undefined;

            const res = await fetch("/api/heating-cover/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ planKey: plan.key, customerEmail, customerName, phone, postcode, address }),
            });

            const data = await res.json();

            if (!res.ok || !data.url) {
                throw new Error(data.error ?? "Something went wrong. Please try again.");
            }

            trackEvent('initiate_payment', { plan: plan.key, value: plan.priceNum, currency: 'GBP' });
            window.location.href = data.url;
        } catch (e) {
            setError((e as Error).message);
            setLoading(false);
        }
    };

    return (
        <div className={style.checkoutPage}>
            <div className={style.inner}>

                {/* Progress stepper */}
                <div className={style.stepper}>
                    {steps.map((label, i) => {
                        const isActive = i === 2;
                        const isCompleted = i < 2;
                        return (
                            <div key={label} className={style.stepItem}>
                                {i > 0 && (
                                    <span className={`${style.stepConnector} ${isCompleted || isActive ? style.stepConnectorActive : ""}`} />
                                )}
                                <div className={`${style.stepPill} ${isActive ? style.stepPillActive : ""} ${isCompleted ? style.stepPillCompleted : ""}`}>
                                    <span className={`${style.stepNum} ${!isActive && !isCompleted ? style.stepNumInactive : ""}`}>
                                        {i + 1}
                                    </span>
                                    <span>{label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Heading */}
                <div className={style.centeredHeader}>
                    <h1 className={style.heading}>Secure Payment</h1>
                    <p className={style.subheading}>
                        Your subscription starts today. Cancel anytime from your account.
                    </p>
                </div>

                {/* Plan box */}
                <div className={style.paymentPlanBox}>
                    <p className={style.paymentPlanName}>HeatAssure™ {plan.name}</p>
                    <p className={style.paymentPlanNote}>Monthly rolling subscription · Cancel anytime</p>
                    <p className={style.paymentPlanPrice}>
                        {plan.price}<span>/month</span>
                    </p>
                    <p className={style.paymentPlanCharge}>First charge today</p>
                </div>

                {/* What happens after payment */}
                <div className={style.paymentInfoBox}>
                    <p className={style.paymentInfoTitle}>What happens after payment:</p>
                    <ul className={style.paymentInfoList}>
                        <li className={style.paymentInfoItem}>
                            <img src="/heatassure/icon-check-green.svg" alt="" width={18} height={18} />
                            <span>Confirmation email sent immediately</span>
                        </li>
                        <li className={style.paymentInfoItem}>
                            <img src="/heatassure/icon-check-green.svg" alt="" width={18} height={18} />
                            <span>Your dedicated London engineer assigned within 24h</span>
                        </li>
                        <li className={style.paymentInfoItem}>
                            <img src="/heatassure/icon-check-green.svg" alt="" width={18} height={18} />
                            <span>Annual boiler service booked at your convenience</span>
                        </li>
                        <li className={style.paymentInfoItem}>
                            <img src="/heatassure/icon-check-green.svg" alt="" width={18} height={18} />
                            <span>Priority line open — call us anytime</span>
                        </li>
                    </ul>
                </div>

                {/* Error message */}
                {error && (
                    <p style={{ color: "#a62501", fontSize: "14px", textAlign: "center" }}>
                        {error}
                    </p>
                )}

                {/* Pay CTA */}
                <button
                    onClick={onPay}
                    disabled={loading}
                    className={style.ctaButton}
                    style={{ opacity: loading ? 0.7 : 1 }}
                >
                    {loading ? "Redirecting to Stripe…" : `Pay Securely with Stripe — ${plan.price}/month`}
                </button>

                {/* Security row */}
                <div className={style.securityRow}>
                    <img src="/heatassure/checkout/icon-lock.svg" alt="" width={14} height={14} />
                    <span>256-bit SSL encryption</span>
                    <span className={style.securityDot}>·</span>
                    <span>Powered by Stripe</span>
                </div>

                {/* Compliance row */}
                <div className={style.complianceRow}>
                    <div className={style.complianceItem}>
                        <img src="/heatassure/checkout/icon-shield.svg" alt="" width={16} height={16} />
                        <span>PCI DSS compliant</span>
                    </div>
                    <div className={style.complianceItem}>
                        <img src="/heatassure/icon-check-green.svg" alt="" width={16} height={16} />
                        <span>Cancel anytime</span>
                    </div>
                </div>

                <div className={style.divider} />

                <p className={style.termsText}>
                    By completing payment you agree to the{" "}
                    <a href="/legal/heatassure-terms">HeatAssure™ Terms &amp; Conditions</a>.
                    Your subscription renews monthly at {plan.price}. You may cancel at any time via
                    your account dashboard or by contacting us.
                </p>

                <Link href={`/heating-cover/checkout/details?plan=${plan.key}`} className={style.backLink}>
                    ← Back to Your Details
                </Link>

            </div>
        </div>
    );
}
