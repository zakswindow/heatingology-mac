import Button from "@/components/Button";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import classNames from "classnames";

export default function PayButton ({ label, className="", ...props }) {
    return (
        <Button className={classNames(styles.button, className)} {...props}>
            <Icon icon={ICONS.LOCK} className={styles.icon} />
            { label }
        </Button>
    );
}