import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import Faqs, { TFaq } from "@/components/Section/Faqs";

const BOILER_TYPES = [{
    label: "Back Boiler",
    image: "https://placehold.co/335x205/f8f8f8/999999?text=Back+Boiler",
    description: "An older type installed behind a fireplace. No longer manufactured but may need replacing."
}, {
    label: "Combi Boiler",
    image: "https://placehold.co/335x205/f8f8f8/999999?text=Combi+Boiler",
    description: "Heats your water on demand directly from the mains without storing it."
}, {
    label: "Regular Boiler",
    image: "https://placehold.co/335x205/f8f8f8/999999?text=Regular+Boiler",
    description: "Heats cold water from a tank and stores it in a hot water cylinder, usually in the loft."
}, {
    label: "System Boiler",
    image: "https://placehold.co/335x205/f8f8f8/999999?text=System+Boiler",
    description: "Heats water stored in a cylinder but sources it directly from the mains — no cold water tank needed."
}];

const FAQS: TFaq[] = [{
    question: "What type of boiler do I need for a small home?",
    answer: "For small homes, a combi boiler is usually the best option — it's compact and heats water on demand, so you don't need a separate tank or cylinder."
}, {
    question: "How long does installation take?",
    answer: "A typical boiler installation takes 1–2 days depending on the boiler type and your home setup."
}, {
    question: "Are combi boilers energy-efficient?",
    answer: "Yes, combi boilers are among the most efficient systems, as they heat water only when needed rather than keeping a stored tank hot."
}];

function BoilerTypeCard ({ label, image, description }: typeof BOILER_TYPES[0]) {
    return (
        <article className={styles.card}>
            <img src={image} alt={label} className={styles.cardImage} />
            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{label}</h3>
                <p className={styles.cardDescription}>{description}</p>
            </div>
        </article>
    );
}

function SupportActionPanel ({ icon, label, href }: { icon: ICONS; label: string; href?: string }) {
    const content = (
        <div className={styles.actionInner}>
            <Icon icon={icon} />
            <span>{label}</span>
        </div>
    );

    if (href) {
        return <a href={href} className={styles.actionPanel}>{content}</a>;
    }

    return <div className={styles.actionPanel}>{content}</div>;
}

export default function MainGasExplainer() {
    return (
        <div className={styles.container}>
            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.heading}>What is main gas?</h2>
                    <p className={styles.subtitle}>
                        Understand the key differences between boiler types to help you choose the right one.
                    </p>
                </div>

                <div className={styles.cards}>
                    {BOILER_TYPES.map((item) => (
                        <BoilerTypeCard key={item.label} {...item} />
                    ))}
                </div>

                <div className={styles.infoCard}>
                    <Icon icon={ICONS.INFO} />
                    <div>
                        <p className={styles.infoTitle}>Not sure which type you have?</p>
                        <p className={styles.infoBody}>
                            Check your energy bill for a gas standing charge — if you pay one, you&apos;re on mains gas. You can also look for a gas meter on an outside wall or under the stairs.
                        </p>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.heading}>Still have questions?</h2>
                    <p className={styles.subtitle}>From our team of experts.</p>
                </div>

                <div className={styles.actions}>
                    <SupportActionPanel icon={ICONS.MOBILE} label="Give me a call back" />
                    <SupportActionPanel icon={ICONS.PHONE} label="Call us on 0333 577 0017" href="tel:03335770017" />
                    <SupportActionPanel icon={ICONS.REQUEST_ESURVEY} label="Request eSurvey" />
                </div>
            </section>
        </div>
    );
}
