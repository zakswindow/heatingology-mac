import classNames from "classnames";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";

export type TCheckboxInput = {
    className?: string;
    listClassName?: string;
    label: string | null;
    options: {
        label: string;
        value: number | string;
    }[];
    defaultValues?: string[];
};

export default function CheckboxInput ({ label, options, className, listClassName, defaultValues, ...props }: TCheckboxInput) {
    const [selected, setSelected] = useState({});

    const onChange = useCallback((evt) => {
        const { value } = evt.target;

        if (!value) {
            return;
        }

        setSelected((prev) => ({
            ...prev,
            [value]: (!prev[value])
        }));
    }, []);

    useEffect(() => {
        if (defaultValues) {
            if (!defaultValues.reduce) {
                return;
            }
            const defaultSelections = defaultValues.reduce((acc, key) => {
                acc[key] = true;
                return acc;
            }, {} as Record<string, boolean>);

            setSelected((prev) => ({
                ...prev,
                ...defaultSelections
            }));
        }
    }, [defaultValues]);

    return (
        <div className={className}>
            { label && 
                <div className={styles.title}>{ label }</div>
            }
            <div className={classNames(listClassName, styles.list)}>
                {
                    options.map((item) => {
                        return (
                            <label
                                key={`${label}-${item.value}`} className={classNames(styles.label, { [styles.checked]: Boolean(selected[item.value.toString()]) }) }>
                                <span className={classNames(styles.checkbox)}>
                                    <span className={styles.checkMark} />
                                </span>
                                <input
                                    className={styles.input}
                                    type="checkbox"
                                    {...props}
                                    value={item.value}
                                    onChange={onChange}
                                />
                                <span> { item.label }</span>
                            </label>
                        );
                    })
                }
            </div>
        </div>
    );
}