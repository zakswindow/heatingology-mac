import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";

type THelpText = { text: string; }

export default function HelpText ({ text }: THelpText) {
    return (
        <div className={styles.container}>
            <Icon icon={ICONS.INFO} />
            { text }
        </div>
    );
}