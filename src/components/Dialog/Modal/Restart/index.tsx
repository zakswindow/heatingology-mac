"use client";

import Dialog from "../..";
import Link from "next/link";
import styles from "./style.module.scss";
import { DialogProps as RadixDialogProps } from "@radix-ui/react-dialog";

type TRestartDialog = {
    productType: string;
    trigger?: React.ReactNode;
    rootProps?: RadixDialogProps;
}

export default function RestartDialog({ productType, trigger, rootProps }: TRestartDialog) {
    return (
        <Dialog
            trigger={trigger}
            rootProps={rootProps}
            title={<span className={styles.title}>Restart?</span>}
            contentClassName={styles.dialog}
        >
            <div className={styles.content}>
                <p className={styles.description}>Would you like to restart?</p>
                <Link href={`/quote/${productType}`} className={styles.button}>
                    Restart questionnaire
                </Link>
            </div>
        </Dialog>
    );
}
