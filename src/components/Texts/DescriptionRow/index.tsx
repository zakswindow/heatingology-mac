import classNames from "classnames";
import styles from "./style.module.scss";

type TDescriptionRow = {
    label: string;
    value: React.ReactNode;
    className?: string;
}

export default function DescriptionRow ({ label, value, className }: TDescriptionRow) {
    return (
        <div className={classNames(className, styles.container)}>
            <dt> { label }</dt>
            <dd> {value} </dd>
        </div>
    );
}