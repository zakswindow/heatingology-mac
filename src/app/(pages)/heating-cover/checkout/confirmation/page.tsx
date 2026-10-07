import Link from "next/link";
import { getPlan } from "@/lib/data/heatassure-plans";
import PurchaseTracker from "./_components/PurchaseTracker";
import style from "../style.module.scss";

type Props = { searchParams: Promise<{ plan?: string }> };

const NEXT_STEPS = [
    {
        title: "Confirmation email sent",
        description: "Check your inbox for your HeatAssure™ plan details and welcome pack.",
    },
    {
        title: "Your engineer assigned",
        description: "A dedicated London-based Gas Safe engineer will be assigned to your property within 24 hours.",
    },
    {
        title: "Annual service booked",
        description: "We'll be in touch to arrange your first annual boiler service at a time that suits you.",
    },
];

export default async function HeatAssureCheckoutConfirmation({ searchParams }: Props) {
    const { plan: planKey } = await searchParams;
    const plan = getPlan(planKey);

    return (
        <div className={style.confirmPage}>
            <div className={style.confirmInner}>
                <PurchaseTracker planKey={planKey ?? "plus"} priceNum={plan.priceNum} />

                {/* Success circle */}
                <div className={style.successCircle}>
                    <img src="/heatassure/checkout/icon-check-circle.svg" alt="Success" width={52} height={52} />
                </div>

                {/* Heading */}
                <h1 className={style.confirmHeading}>
                    You&apos;re covered! Welcome to HeatAssure™ {plan.name}.
                </h1>

                <p className={style.confirmBody}>
                    Your HeatAssure™ {plan.name} plan is now active at {plan.price}/month.
                    Enjoy priority engineer access, your annual service, and the peace of mind
                    that comes with full labour cover.
                </p>

                {/* Next steps */}
                <div className={style.confirmStepsBox}>
                    {NEXT_STEPS.map((step, i) => (
                        <div key={step.title}>
                            {i > 0 && <div className={style.confirmStepDivider} />}
                            <div className={style.confirmStep}>
                                <div className={style.confirmStepNum}>{i + 1}</div>
                                <div className={style.confirmStepContent}>
                                    <p className={style.confirmStepTitle}>{step.title}</p>
                                    <p className={style.confirmStepDesc}>{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action buttons */}
                <div className={style.confirmButtons}>
                    <Link href="/account" className={`${style.ctaButton} ${style.ctaButtonOutline}`}>
                        View My Account
                    </Link>
                    <Link href="/" className={style.ctaButton}>
                        Return to Homepage
                    </Link>
                </div>

                {/* Support */}
                <p className={style.confirmSupport}>
                    Need help? Call us on{" "}
                    <a href="tel:02080507577">0208 050 7577</a> or email{" "}
                    <a href="mailto:customerservice@heatingology.co.uk">customerservice@heatingology.co.uk</a>
                </p>

            </div>
        </div>
    );
}
