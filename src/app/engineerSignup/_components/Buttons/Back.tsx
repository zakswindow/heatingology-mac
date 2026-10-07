import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import classNames from "classnames";

export default function BackButton ({ className = "", onClick }) {
    return (
        <Button className={classNames(className, styles.button)} variant="outline" onClick={onClick}> 
            <Icon icon={ICONS.ARROW_LEFT} />
            Back
        </Button>
    )
}