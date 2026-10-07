"use client";

import { Control, Controller, FieldValues } from "react-hook-form";
import styles from "./style.module.scss";
import classNames from "classnames";
import dynamic from "next/dynamic";
import Loading from "@/app/loading";

type TSelect<TControlValues extends FieldValues = FieldValues> = {
    label: string;
    options: { label: string, value: string }[];
    error?: string;
    control: Control<TControlValues>;
    name: string;
    isDirty: boolean;
    disabled: boolean;
    defaultValue?: string;
}

const ReactSelect = dynamic(() => import("react-select"), {
    ssr: false,
    loading: () => <Loading />
});

export default function Select ({ label: inputLabel, options, error, control, name, isDirty, disabled }: TSelect) {   
    return (
        <label
            className={classNames(styles.container, {
                [styles.dirty]: isDirty,
                [styles.disabled]: disabled 
            })}>
            <div className={styles.label}>{ inputLabel }</div>
            <Controller
                control={control}
                name={name}
                render={(props) => {
                    const { field } = props;
                    const { onChange, value, ...fieldProps } = field;
                    const selectedOption = options.find(option => option.value === value) || null;
                    return (
                        <ReactSelect
                            {...props}
                            value={selectedOption}
                            options={options}
                            onChange={({ value }) => { onChange(value); }}
                            classNames={{
                                menu: () => styles.menu,
                                indicatorSeparator: () => styles.seperator,
                                dropdownIndicator: () => styles.arrow,
                                control: ({ isFocused }) => isFocused ? `${styles.select} ${styles.focused}` : styles.select,
                                option: ({ isSelected }) => isSelected ? `${styles.option} ${styles.isSelected}` : styles.option
                            }}
                        />
                    );
                }}
            />
            {
                error && <p> { error } </p>
            }
        </label>
    );
}