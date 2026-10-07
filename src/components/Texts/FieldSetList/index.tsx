import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

type TFieldsetList = {
    className?: string;
    listClassName?: string;
    title: string;
    data: any[];
    renderComponent: (item: any) => React.ReactNode;
}

export default function FieldsetList ({className, listClassName = "", title, data, renderComponent }: TFieldsetList) {
    return (
        <fieldset className={classNames(styles.container, className)}>
            <legend>{ title }</legend>
            <section className={listClassName}>
                {
                    data.map((item) => {
                        return renderComponent(item);
                    })
                }
            </section>
        </fieldset>
    );
}