import classNames from "classnames";
import styles from "./style.module.scss";

type TDescriptionItem = {
    label: string;
    value: string;
    className?: string;
    children?: React.ReactNode;
    head?: React.ReactNode;
    tail?: React.ReactNode;
}

function Description ({ className, label, value, children }: Exclude<TDescriptionItem, "head" | "tail">) {
    return (
        <dl className={className}>
            <dt>{label}</dt>
            <dd> {value}</dd>
            { children }
        </dl>
    );
}

export default function DescriptionItem ({
    head = null,
    tail = null,
    className = "",
    ...props
}: TDescriptionItem) {

    if (head || tail) {
        return (
            <div className={classNames(styles.container, className)}>
                {head}
                <Description className={className} {...props} />
                {tail}
            </div>
        );
    }

    return (<Description className={className} {...props} /> );
}