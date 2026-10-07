import React from "react";
import styles from "./style.module.scss";

interface CardData {
    num: string;
    title: string;
    body: string;
    pill?: { text: string; variant: "blue" | "orange" };
}

const SMALL_CARDS: CardData[] = [
    {
        num: "02",
        title: "You'll know who's coming before they arrive",
        body: "Every engineer is Gas Safe registered, fully insured, and background-checked. We send you their name and photo beforehand so there are no surprises at the door.",
        pill: { text: "Gas Safe Registered", variant: "blue" },
    },
    {
        num: "03",
        title: "The price we quote is the price you pay",
        body: "We go through every cost with you before any work starts. No call-out charges, no extras added on at the end. What you see is genuinely what you pay.",
        pill: { text: "No hidden fees", variant: "orange" },
    },
    {
        num: "04",
        title: "We find the real problem, not just the obvious one",
        body: "We take the time to properly diagnose the fault before touching anything. That means fewer return visits and a fix that actually holds.",
    },
    {
        num: "05",
        title: "Pay in a way that works for you",
        body: "If the cost is a stretch right now, we can split it into manageable payments. No pushy upsells, no confusing terms. Just a straightforward option if you need it.",
    },
];

const TRUST_ITEMS = [
    { val: "4.9 ★",           label: "Average rating" },
    { val: "10+ years",        label: "In the trade" },
    { val: "Same day",         label: "Emergency callouts" },
    { val: "£0 hidden fees",   label: "What you're quoted is what you pay" },
];

const IconShield = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2z" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);

const IconPound = () => (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <text x="12" y="17" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor" fontFamily="inherit">£</text>
    </svg>
);

const IconScreen = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M9 10l2 2 4-4" />
    </svg>
);

const IconCard = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
);

const IconHeart = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const CARD_ICONS = [IconShield, IconPound, IconScreen, IconCard];

function SmallCard({ card, index }: { card: CardData; index: number }) {
    const Icon = CARD_ICONS[index];
    const pillClass = card.pill?.variant === "orange" ? styles.pillOrange : styles.pillBlue;
    return (
        <div className={styles.card}>
            <span className={styles.cardNum}>{card.num}</span>
            <div className={styles.iconBadge} aria-hidden="true">
                <Icon />
            </div>
            {card.pill && (
                <span className={`${styles.pill} ${pillClass}`}>
                    {card.pill.text}
                </span>
            )}
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardBody}>{card.body}</p>
        </div>
    );
}

export default function HeatingologyDifference({ id }: { id?: string }) {
    return (
        <section className={styles.section} aria-labelledby="hd-heading" id={id}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <span className={styles.eyebrow}>Why choose us</span>
                        <h2 id="hd-heading" className={styles.title}>
                            The Heatingology<br />Difference
                        </h2>
                    </div>
                    <p className={styles.headerSubtitle}>
                        Six reasons thousands of homeowners trust us with their homes and keep coming back.
                    </p>
                </div>

                <div className={styles.grid}>

                    <div className={styles.featuredCard}>
                        <div className={styles.featuredGlow} aria-hidden="true" />
                        <div className={styles.featuredContent}>
                            <span className={styles.featuredNum}>01 · OUR GUARANTEE</span>
                            <p className={styles.featuredStat} aria-label="12 months guarantee">
                                12 <span>months</span>
                            </p>
                            <h3 className={styles.featuredTitle}>
                                If it comes back, so do we
                            </h3>
                            <p className={styles.featuredBody}>
                                Every repair we do is covered for 12 months. If the same fault shows up again,
                                we come back and sort it at no extra charge. No forms to fill in, no haggling.
                                We just come back.
                            </p>
                        </div>
                    </div>

                    <div className={styles.rightGrid}>
                        <div className={styles.cardRow}>
                            {SMALL_CARDS.slice(0, 2).map((card, i) => (
                                <SmallCard key={card.num} card={card} index={i} />
                            ))}
                        </div>
                        <div className={styles.cardRow}>
                            {SMALL_CARDS.slice(2).map((card, i) => (
                                <SmallCard key={card.num} card={card} index={i + 2} />
                            ))}
                        </div>

                        <div className={styles.wideCard}>
                            <div className={styles.iconBadge} aria-hidden="true">
                                <IconHeart />
                            </div>
                            <span className={styles.wideCardNum}>06</span>
                            <div className={styles.wideCardContent}>
                                <h3 className={styles.cardTitle}>We check in after every job</h3>
                                <p className={styles.cardBody}>
                                    Once the work is done, we follow up to make sure everything is still running well.
                                    You can reach us directly, and we&apos;ll remind you when your boiler is due a service.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={styles.trustBar}>
                    {TRUST_ITEMS.map((item, i) => (
                        <React.Fragment key={item.val}>
                            <div className={styles.trustItem}>
                                <span className={styles.trustVal}>{item.val}</span>
                                <span className={styles.trustLabel}>{item.label}</span>
                            </div>
                            {i < TRUST_ITEMS.length - 1 && (
                                <div className={styles.trustSep} aria-hidden="true" />
                            )}
                        </React.Fragment>
                    ))}
                    <a href="/quote/boiler" className={styles.ctaButton}>
                        Get a free quote →
                    </a>
                </div>

            </div>
        </section>
    );
}
