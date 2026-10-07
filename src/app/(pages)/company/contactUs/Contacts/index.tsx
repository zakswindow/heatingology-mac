import classNames from "classnames";
import styles from "./style.module.scss";
import ContactCard from "./Card";
import Icon from "@/components/Image/Icons";
import SocialMedia from "./SocialMedia";
import Email from "@/components/Anchor/Email";
import EngineersContact from "./EngineersContact";
import ContactBanner from "./Banner";

export default function Contacts ({ className = "" }) {
    enum CARD_TYPES {
        SOCIAL,
        PARTNERSHIP,
        ENGINEERS
    };

    const cards = [{
        type: CARD_TYPES.SOCIAL,
        headline: "Follow Us",
        subHeadline: "Stay up to date with the latest from Heatingology - tips, updates, and new services.",
        iconUrl: "/contactUs/social.svg"
    }, {
        type: CARD_TYPES.PARTNERSHIP,
        headline: "Partner With Us",
        subHeadline: "We’re always looking to work with trusted engineers and partners who care about doing things properly.",
        iconUrl: "/contactUs/partnership.svg"
    }, {
        type: CARD_TYPES.ENGINEERS,
        headline: "Join as an Engineer",
        subHeadline: "Work with us and get consistent jobs, fair pricing, and real support.",
        iconUrl: "/contactUs/engineers.svg"
    }];

    function getCardChildren (type: CARD_TYPES) {
        switch (type) {
            case CARD_TYPES.SOCIAL:
                return <SocialMedia />;
            case CARD_TYPES.PARTNERSHIP:
                return <Email className={styles.email} email={"partners@heatingology.co.uk"} />;
            case CARD_TYPES.ENGINEERS:
                return <EngineersContact />;
            default:
                return null;
        }
    }

    return (
        <section className={classNames(styles.container)}>
            <div className={styles.cards}>
                {
                    cards.map((item) => {
                        const { type, ...props } = item;

                        return (
                            <ContactCard
                                key={item.headline}
                                {...props}
                            >
                                { getCardChildren(type) }
                            </ContactCard>
                        );
                    })
                }
            </div>
            <ContactBanner />
        </section>
    );
}