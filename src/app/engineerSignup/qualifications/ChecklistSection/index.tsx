import CheckboxInput from "@/components/Input/CheckboxInput";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useState } from "react";

function Section ({ label, children, className="" }) {
    return (
        <fieldset className={classNames(className, styles.section)}>
            <span className={styles.title}> { label }</span>
            { children }
        </fieldset>
    );
}

function parseCheckboxInputOptions (data) {
    return data.map((item) => {
        return ({
            label: item.name,
            value: item.id
        });
    });
}

export default function ChecklistSection ({ className, label, data, register, defaultValues }) {
    const registerName = "qualifications";

    return (
        <>
            <h2 className={classNames(styles.title, className)}> { label } </h2>
            <fieldset className={styles.fieldset}>
                {
                    data.groups ?
                        data.groups.map((item) => {
                            if (item.title) {
                                return <CheckboxInput
                                    listClassName={styles.checklist}
                                    className={styles.checklistContainer}
                                    key={item.title}
                                    label={item.title} 
                                    options={parseCheckboxInputOptions(item.data)}
                                    defaultValues={defaultValues}
                                    {...register(registerName)} />;
                            }
                        })
                        : 
                        <CheckboxInput
                            listClassName={styles.checklist}
                            className={styles.checklistContainer}
                            label={""} options={parseCheckboxInputOptions(data)}
                            defaultValues={defaultValues}
                            {...register(registerName)} />
                }
            </fieldset>
        </>
    );
}