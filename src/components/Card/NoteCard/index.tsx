import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import Icon, { ICONS } from "@/components/Image/Icons";

type TNoteCard = {
    children: React.ReactNode;
    icon?: ICONS;
    variant?: "default" | "hightlight";
    className?: string;
}

export default function NoteCard ({ children, icon, variant = "default", className }: TNoteCard) {
    return (
        <div className={classNames(styles.note, className, { [styles.highlight]: variant === "hightlight" })}>
            {
                icon &&
                    <Icon className={styles.icon} icon={icon} />
            }
            <span className={styles.noteText}>{ children }</span>
        </div>
    );
}