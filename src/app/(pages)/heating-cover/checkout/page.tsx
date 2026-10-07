import Link from "next/link";
import { getPlan } from "@/lib/data/heatassure-plans";
import TrackableLink from "../_components/TrackableLink";
import style from "./style.module.scss";

type Props = { searchParams: Promise<{ plan?: string }> };

export default async function HeatAssureCheckoutStep1({ searchParams }: Props) {
    const { plan: planKey } = await searchParams;
    const plan = getPlan(planKey);

    const steps = ["Choose Plan", "Your Details", "Payment", "Confirmation"];

    return (
        <div className={style.checkoutPage}>
            <div className={style.inner}>

                {/* Progress stepper */}
                <div className={style.stepper}>
                    {steps.map((label, i) => {
                        const isActive = i === 0;
                        return (
                            <div key={label} className={style.stepItem}>
                                {i > 0 && (
                                    <span className={style.stepConnector} />
                                )}
                                <div className={`${style.stepPill} ${isActive ? style.stepPillActive : ""}`}>
                                    <span className={`${style.stepNum} ${!isActive ? style.stepNumInactive : ""}`}>
                                        {i + 1}
                                    </span>
                                    <span>{label}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Heading */}
                <h1 className={style.heading}>
                    You&apos;ve chosen HeatAssure™ {plan.name}
                </h1>

                {/* Plan box */}
                <div className={style.planBox}>
                    <div className={style.planBoxHeader}>
                        <span className={style.planBoxName}>HeatAssure™ {plan.name}</span>
                        <span className={style.planBoxPrice}>
                            {plan.price}<span>/month</span>
                        </span>
                    </div>

                    <p className={style.planBoxLabel}>What&apos;s included</p>

                    <ul className={style.planFeatureList}>
                        {plan.features.map((f) => (
                            <li key={f} className={style.planFeatureItem}>
                                <img src="/heatassure/icon-check-green.svg" alt="" width={20} height={20} />
                                <span>{f}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Info box */}
                <div className={style.infoBox}>
                    <img src="/heatassure/checkout/icon-idea.svg" alt="" width={20} height={20} style={{ flexShrink: 0, marginTop: 2 }} />
                    <p className={style.infoBoxText}>
                        Your cover starts immediately after payment. We&apos;ll send you a confirmation email and assign your dedicated London engineer within 24 hours.
                    </p>
                </div>

                {/* CTA */}
                <TrackableLink
                    href={`/heating-cover/checkout/details?plan=${plan.key}`}
                    className={style.ctaButton}
                    eventName="begin_checkout"
                    eventParams={{ plan: plan.key }}
                >
                    Continue — Enter Your Details
                </TrackableLink>

                {/* Back link */}
                <Link href="/heating-cover#plans" className={style.backLink}>
                    ← Change plan
                </Link>

            </div>
        </div>
    );
}
