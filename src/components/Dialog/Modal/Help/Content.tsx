import Button from "@/components/Button";
import Tel from "@/components/Anchor/Tel";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";

type THelpContent = {
    onCallbackRequest?: () => void;
}

export default function HelpContent ({ onCallbackRequest }: THelpContent) {
    return (
        <section className={styles.helpContainer}>
            <p className={styles.description}> Talk to one of our highly trained boiler experts. </p>
            <section className={styles.buttonList}>
                <Button variant="outline" className={styles.button} onClick={onCallbackRequest}>
                    <Icon className={styles.icon} icon={ICONS.PHONE} />
                    <span className={styles.label}>Give me a call back</span>
                </Button>
                <Button variant="outline" className={styles.button}>
                    <Icon className={styles.icon} icon={ICONS.MOBILE} />
                    <span className={styles.label}> {`Call us `} <Tel /> </span>
                </Button>
            </section>
        </section>
    );
}