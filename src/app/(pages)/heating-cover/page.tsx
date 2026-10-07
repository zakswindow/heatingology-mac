import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Faqs from "@/components/Section/Faqs";
import TrackableLink from "./_components/TrackableLink";
import style from "./style.module.scss";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
    title: "HeatAssure™ — London's Heating Protection Plan",
    description: "One affordable monthly plan. Annual boiler service included. All labour covered. Priority engineers at your door — same or next day. From £19/month.",
    openGraph: {
        title: "HeatAssure™ — London's Heating Protection Plan | Heatingology",
        description: "Stop paying every time your boiler breaks down. One affordable monthly plan with annual service, all labour covered, and same-day priority engineers.",
    },
};

const FAQS = [
    {
        question: "What does HeatAssure™ actually cover?",
        answer: "HeatAssure™ covers all labour costs for boiler breakdowns and repairs, an annual boiler service, and priority engineer callouts. The Plus and Pro plans include no labour charges on any repair visit. Pro adds emergency callouts and a £50 late response guarantee.",
    },
    {
        question: "Is there a contract or lock-in period?",
        answer: "No contracts and no lock-in. HeatAssure™ is a monthly rolling subscription billed via Stripe. You can cancel online at any time with no cancellation fees.",
    },
    {
        question: "How quickly will an engineer come out?",
        answer: "HeatAssure™ members receive priority booking. We aim for same-day or next-day callouts for all plan holders, with Pro members receiving the highest-priority engineer assignment.",
    },
    {
        question: "What is the £50 late response guarantee?",
        answer: "On our Pro plan, if we fail to respond within the guaranteed timeframe, you receive a £50 credit towards your next bill. It's our commitment to putting you first.",
    },
    {
        question: "How does billing work?",
        answer: "Billing is monthly via Stripe, fully SSL encrypted. Your first charge is taken on signup. You can upgrade, downgrade, or cancel your plan at any time directly from your account.",
    },
    {
        question: "Can I upgrade my plan later?",
        answer: "Yes — you can upgrade from Essential to Plus or Pro at any time. Changes take effect on your next billing cycle. There's no penalty and no re-sign-up required.",
    },
];

const TRUST_BADGES = [
    "Gas Safe Registered",
    "5★ Google Reviews",
    "500+ London Customers",
    "Same-Day Response Guarantee",
];

const WITHOUT_COVER = [
    "Emergency callout: £150–£400 per visit",
    "Waiting 3–5 days for an engineer",
    "Labour charged every time",
    "No annual service — boiler degrades faster",
    "Unexpected bills at the worst time",
];

const WITH_COVER = [
    "All labour covered, no surprise charges",
    "Priority same/next-day callouts",
    "Annual boiler service included",
    "15% off parts",
    "£50 late response guarantee (Pro plan)",
];

const HOW_IT_WORKS = [
    {
        step: 1,
        title: "Choose Your Plan",
        description: "Pick Essential, Plus, or Pro. Takes 2 minutes online.",
    },
    {
        step: 2,
        title: "Register Your Details",
        description: "Your name, address and boiler info so we can assign your engineer.",
    },
    {
        step: 3,
        title: "Pay Securely via Stripe",
        description: "Monthly billing. First charge on signup. Cancel or upgrade anytime.",
    },
    {
        step: 4,
        title: "You're Covered Year-Round",
        description: "Annual service booked. Priority line open. Labour covered.",
    },
];

const TESTIMONIALS = [
    {
        quote: "Boiler packed in December. They were here next morning. Worth every penny of the plan.",
        name: "James T.",
        location: "Camden",
    },
    {
        quote: "Annual service done, no fuss. The fact that labour is included makes the maths obvious.",
        name: "Priya S.",
        location: "Hackney",
    },
    {
        quote: "Used them twice in three months. Without the cover plan I'd have paid over £600.",
        name: "Mohammed A.",
        location: "Islington",
    },
];

const PLANS = [
    {
        name: "Essentials",
        price: "£19",
        popular: false,
        planKey: "essential",
        features: [
            { text: "Annual boiler service", included: true },
            { text: "Priority booking", included: true },
            { text: "10% off all repairs", included: true },
            { text: "Labour charges apply", included: false },
            { text: "Emergency callouts extra", included: false },
        ],
        ctaText: "Get Essential Cover",
        ctaVariant: "outline" as const,
        note: "No contract · Cancel anytime",
    },
    {
        name: "Plus",
        price: "£29",
        popular: true,
        planKey: "plus",
        features: [
            { text: "Annual boiler service", included: true },
            { text: "Priority booking", included: true },
            { text: "No labour charges", included: true },
            { text: "Priority same/next-day callouts", included: true },
            { text: "15% off parts", included: true },
            { text: "Emergency callouts (add-on available)", included: false },
        ],
        ctaText: "Get HeatAssure™ Plus",
        ctaVariant: "primary" as const,
        note: "Most customers choose Plus · Cancel anytime",
    },
    {
        name: "Pro",
        price: "£39",
        popular: false,
        planKey: "pro",
        features: [
            { text: "Everything in Plus", included: true },
            { text: "Emergency callouts included", included: true },
            { text: "£50 late response guarantee", included: true },
            { text: "Priority engineer assignment", included: true },
        ],
        ctaText: "Get Pro Cover",
        ctaVariant: "outline" as const,
        note: "No contract · Cancel anytime",
    },
];

function CheckIcon() {
    return (
        <img
            src="/heatassure/icon-check-green.svg"
            alt="Included"
            width={20}
            height={20}
            className={style.featureIcon}
        />
    );
}

function XIcon({ variant = "red" }: { variant?: "red" | "grey" }) {
    return (
        <img
            src={variant === "red" ? "/heatassure/icon-x-red.svg" : "/heatassure/icon-x-grey.svg"}
            alt="Not included"
            width={20}
            height={20}
            className={style.featureIcon}
        />
    );
}

function StarRating() {
    return (
        <div className={style.stars}>
            {[1, 2, 3, 4, 5].map((i) => (
                <img key={i} src="/heatassure/icon-star.svg" alt="" width={24} height={24} />
            ))}
        </div>
    );
}

export default function HeatAssurePage() {
    return (
        <div className={style.page}>

            {/* ── Hero ─────────────────────────────────────────────── */}
            <section className={style.hero}>
                <div className={style.heroBgWrapper}>
                    <Image
                        src="/hero/home_hero.jpg"
                        alt=""
                        fill
                        priority
                        className={style.heroBgImage}
                    />
                    <div className={style.heroGradient} />
                </div>

                <div className={style.heroContent}>
                    <div className={style.heroLeft}>
                        <div className={style.heroBadge}>
                            HeatAssure™ — London&apos;s Heating Protection Plan
                        </div>

                        <div className={style.heroText}>
                            <div>
                                <h1 className={style.heroHeading}>
                                    Stop Paying Every Time Your Boiler Breaks Down
                                </h1>
                                <p className={style.heroSubtext}>
                                    One affordable monthly plan. Annual service included.
                                </p>
                            </div>

                            <div className={style.heroCtas}>
                                <TrackableLink
                                    href="/heating-cover/checkout?plan=essential"
                                    className={style.ctaPrimary}
                                    eventName="cta_click"
                                    eventParams={{ label: 'hero_heatassure', destination: '/heating-cover/checkout?plan=essential' }}
                                >
                                    Get HeatAssure™ from £19/mo
                                    <span className={style.ctaArrow}>↗</span>
                                </TrackableLink>
                                <Link href="#plans" className={style.ctaOutline}>
                                    See All Plans
                                </Link>
                            </div>
                        </div>

                        <div className={style.heroTrust}>
                            {["No Hidden Costs", "Cancel Anytime", "Gas Safe Registered", "Same-Day Response"].map((item) => (
                                <div key={item} className={style.heroTrustItem}>
                                    <img src="/heatassure/icon-check-hero.svg" alt="" width={24} height={24} />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={style.heroStatCard}>
                        <p className={style.heroStatAmount}>£350</p>
                        <p className={style.heroStatLabel}>Average emergency boiler callout cost</p>
                        <p className={style.heroStatNote}>One callout = months of HeatAssure™</p>
                    </div>
                </div>
            </section>

            {/* ── Statistics Comparison ────────────────────────────── */}
            <section className={style.statsSection}>
                <h2 className={style.statsSectionTitle}>
                    One Callout Can Cost More Than a Year of Cover
                </h2>

                <div className={style.statsGrid}>
                    <div className={style.statsPanel}>
                        <h3 className={style.statsPanelTitle}>Without HeatAssure™</h3>
                        <ul className={style.statslist}>
                            {WITHOUT_COVER.map((item) => (
                                <li key={item} className={style.statsListItem}>
                                    <img src="/heatassure/icon-x-red.svg" alt="" width={32} height={32} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${style.statsPanel} ${style.statsPanelHighlight}`}>
                        <h3 className={style.statsPanelTitle}>With HeatAssure™</h3>
                        <ul className={style.statslist}>
                            {WITH_COVER.map((item) => (
                                <li key={item} className={style.statsListItem}>
                                    <img src="/heatassure/icon-check-badge.svg" alt="" width={32} height={32} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ── Pricing Plans ────────────────────────────────────── */}
            <section id="plans" className={style.pricingSection}>
                <div className={style.pricingHeader}>
                    <h2 className={style.pricingSectionTitle}>Choose Your HeatAssure™ Plan</h2>
                    <p className={style.pricingSectionSubtitle}>
                        All plans include a dedicated London-based engineer and monthly billing through Stripe. No contracts. Cancel anytime.
                    </p>
                </div>

                <div className={style.pricingGrid}>
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`${style.planCard} ${plan.popular ? style.planCardPopular : ""}`}
                        >
                            {plan.popular && (
                                <div className={style.planPopularBadge}>Most Popular</div>
                            )}

                            <div className={style.planHeader}>
                                <p className={style.planName}>{plan.name}</p>
                                <div className={style.planPriceRow}>
                                    <span className={style.planPrice}>{plan.price}</span>
                                    <span className={style.planPricePeriod}>/month</span>
                                </div>
                            </div>

                            <ul className={style.planFeatures}>
                                {plan.features.map((feature) => (
                                    <li key={feature.text} className={style.planFeatureItem}>
                                        {feature.included
                                            ? <CheckIcon />
                                            : <XIcon variant={plan.popular ? "grey" : "grey"} />
                                        }
                                        <span className={plan.popular ? style.planFeatureTextLight : style.planFeatureText}>
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className={style.planCta}>
                                <TrackableLink
                                    href={`/heating-cover/checkout?plan=${plan.planKey}`}
                                    className={`${style.planCtaBtn} ${plan.popular ? style.planCtaBtnWhite : style.planCtaBtnOutline}`}
                                    eventName="select_plan"
                                    eventParams={{ plan: plan.planKey, price: plan.price }}
                                >
                                    {plan.ctaText}
                                </TrackableLink>
                                <p className={style.planCtaNote}>{plan.note}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <p className={style.pricingFootnote}>
                    Secure monthly billing via Stripe · SSL encrypted · Cancel online anytime
                </p>
            </section>

            {/* ── How It Works ─────────────────────────────────────── */}
            <section className={style.howSection}>
                <h2 className={style.howTitle}>How HeatAssure™ Works</h2>

                <div className={style.howSteps}>
                    {HOW_IT_WORKS.map((item, index) => (
                        <Fragment key={item.step}>
                            <div className={style.howStep}>
                                <div className={style.howStepTop}>
                                    <div className={style.howStepNumber}>{item.step}</div>
                                    <p className={style.howStepTitle}>{item.title}</p>
                                </div>
                                <p className={style.howStepDesc}>{item.description}</p>
                            </div>
                            {index < HOW_IT_WORKS.length - 1 && (
                                <span className={style.howArrow}>→</span>
                            )}
                        </Fragment>
                    ))}
                </div>
            </section>

            {/* ── Testimonials ─────────────────────────────────────── */}
            <section className={style.testimonialsSection}>
                <h2 className={style.testimonialsTitle}>Trusted by London Homeowners</h2>

                <div className={style.testimonialsGrid}>
                    {TESTIMONIALS.map((t) => (
                        <div key={t.name} className={style.testimonialCard}>
                            <div className={style.testimonialTop}>
                                <StarRating />
                                <p className={style.testimonialQuote}>{t.quote}</p>
                            </div>
                            <div className={style.testimonialAuthor}>
                                <div className={style.testimonialAuthorText}>
                                    <p className={style.testimonialName}>{t.name}</p>
                                    <p className={style.testimonialLocation}>{t.location}</p>
                                </div>
                                <img src="/heatassure/icon-quote.svg" alt="" width={55} height={43} className={style.testimonialQuoteIcon} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={style.trustBadges}>
                    {TRUST_BADGES.map((badge) => (
                        <div key={badge} className={style.trustBadge}>{badge}</div>
                    ))}
                </div>
            </section>

            {/* ── Banner CTA ───────────────────────────────────────── */}
            <section className={style.bannerSection}>
                <div className={style.bannerBg}>
                    <Image src="/heatassure/banner-boiler.jpg" alt="" fill className={style.bannerBgImage} />
                    <div className={style.bannerOverlay} />
                </div>
                <div className={style.bannerContent}>
                    <h2 className={style.bannerTitle}>
                        Trusted, affordable heating care, whenever your home needs us.
                    </h2>
                    <p className={style.bannerSubtitle}>
                        Lock in your monthly rate before availability closes in your area.
                    </p>
                    <Link href="#plans" className={style.bannerCta}>
                        Get HeatAssure™ Today
                    </Link>
                </div>
            </section>

            {/* ── FAQs ─────────────────────────────────────────────── */}
            <Faqs
                faqs={FAQS}
                label="Frequently Asked Questions"
                subtitle="Everything you need to know about HeatAssure™"
                showViewAll={false}
            />

            {/* ── Bottom CTA ───────────────────────────────────────── */}
            <section className={style.bottomCta}>
                <div className={style.bottomCtaHeader}>
                    <h2 className={style.bottomCtaTitle}>
                        Your Boiler Won&apos;t Warn You — But Your Plan Will Protect You.
                    </h2>
                    <p className={style.bottomCtaSubtitle}>
                        Join hundreds of London homeowners who never worry about unexpected heating bills.
                    </p>
                </div>

                <div className={style.bottomCtaPlans}>
                    {PLANS.map((plan) => (
                        <div
                            key={plan.name}
                            className={`${style.bottomPlanCard} ${plan.popular ? style.bottomPlanCardPopular : ""}`}
                        >
                            <div className={style.planHeader}>
                                {plan.popular && (
                                    <p className={style.planPopularBadgeWhite}>Most Popular</p>
                                )}
                                <p className={style.planName}>{plan.name}</p>
                                <div className={style.planPriceRow}>
                                    <span className={style.planPrice}>{plan.price}</span>
                                    <span className={style.planPricePeriod}>/month</span>
                                </div>
                            </div>
                            <TrackableLink
                                href={`/heating-cover/checkout?plan=${plan.planKey}`}
                                className={`${style.planCtaBtn} ${plan.popular ? style.planCtaBtnWhite : style.planCtaBtnOutline}`}
                                eventName="select_plan"
                                eventParams={{ plan: plan.planKey, price: plan.price }}
                            >
                                {plan.ctaText}
                            </TrackableLink>
                        </div>
                    ))}
                </div>

                <p className={style.bottomCtaNote}>
                    Secure Stripe billing · No contract · Cancel anytime
                </p>
            </section>
        </div>
    );
}
