import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import classNames from "classnames";
import styles from "./style.module.scss";

export default function ContinueButton ({ className = "", onClick = () => {} }) {
    return (
        <Button className={classNames(className, styles.button)} onClick={onClick} type="submit">
            Continue
            <Icon icon={ICONS.ARROW_RIGHT} />
        </Button>
    );
}