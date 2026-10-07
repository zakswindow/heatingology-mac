"use client";

import Dialog from "../..";
import GenerateContent from "./Content";
import styles from "./style.module.scss";

export default function GenerateDialog ({ rootProps, dialogData }) {
    return (
        <Dialog
            isOverlayBlur
            hideCloseButton
            contentClassName={styles.dialog}
            rootProps={rootProps}>
            <GenerateContent {...dialogData} />
        </Dialog>
    );
}