import Tel from "@/components/Anchor/Tel";
import CallbackCard from "./Card";
import styles from "./style.module.scss";
import classNames from "classnames";
import { CONTACT_US_IMAGES } from "@/lib/_imageMap";

export default function Callbacks ({ className = ""}) {
    return (
        <section className={classNames(styles.container, className)}>
            <CallbackCard
                headline={`Talk to Our Team`}
                subHeadline={`Thinking about a new boiler or upgrade? Speak to our team for honest advice and a fixed quote.`}
                image={CONTACT_US_IMAGES.TALK_TO_OUR_TEAM}
                details={[
                    <li key={'callUs'}>{`Call `} <Tel /></li>,
                    <li key={'mon-thu'}><strong>{`Mon-Fri: `}</strong> {`9am - 6pm`}</li>,
                    <li key={"sat"}><strong>{`Sat: `}</strong>{`10am - 2pm`}</li>
                ]}
            />
            <CallbackCard
                headline={`Need Support?`}
                subHeadline={`Already a customer? Report an issue or get help from our support team, we’ll get things sorted quickly.`}
                image={CONTACT_US_IMAGES.NEED_SUPPORT}
                details={[
                    <li key={'callUs'}>{`Call `} <Tel /></li>,
                    <li key={'mon-thu'}><strong>{`Mon-Fri: `}</strong> {`9am - 6pm`}</li>
                ]}
            />
        </section>
    );
}