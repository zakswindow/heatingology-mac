import { CreateCompanyInput } from "@/app/api/engineers/_parser/company";
import { CompanyType } from "@prisma/client";
import { FieldError, FieldValue, FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./style.module.scss";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import RadioMark from "./RadioMark";

type TOption = {
    label: React.ReactNode;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any;
}

type TRadioInput = {
    label: string;
    options: TOption[];
    name: string;
    register: UseFormRegister<any>;
    orientation?: "horizontal" | "vertical";
    className?: string;
    onChange?: (evt: React.MouseEvent<HTMLInputElement>) => void;
    optionClassNames?: {
        option?: string;
        selected?: string;
    };
    radioMark?: React.ReactNode;
    defaultValue?: string;
    error?: FieldError;
}

export default function RadioInput ({ 
    label,
    options, 
    name, 
    register, 
    orientation = "horizontal", 
    className, onChange, 
    optionClassNames = {},
    radioMark,
    defaultValue = "",
    error
}: TRadioInput) {
    const [selected, setSelected] = useState(defaultValue);
    const { option: optionCss, selected: optionSelectedCss = "" } = optionClassNames;

    useEffect(() => {
        setSelected(defaultValue);
    }, [defaultValue]);

    return (
        <fieldset className={classNames(styles.container, className)}>
            <legend className={styles.title}>{ label }</legend>
            <div className={styles[orientation]}>
                {
                    options.map((item) => {
                        const isSelected = selected === item.value.toString();
                        return (
                            <label key={item.value} className={classNames(styles.inputContainer, optionCss, { [optionSelectedCss]: isSelected })}>
                                <RadioMark isSelected={isSelected} radioMark={radioMark} />
                                <input
                                    type="radio"
                                    value={item.value}
                                    {...register(name, {
                                        onChange: (evt) => {
                                            if (onChange) {
                                                onChange(evt);
                                            }
                                            setSelected(evt.target.value);
                                        } 
                                    })}
                                />
                                <span className={styles.label}> { item.label }</span>
                            </label>
                        );
                    })
                }
            </div>
            { error && error.message && <p className={styles.errorMessage}> {error.message }</p>}
        </fieldset>
    );
}