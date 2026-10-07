"use client";
import { useCallback, useEffect, useState } from "react";
import Dialog, { TDialog } from "../..";
import SaveQuoteContent, { TSaveQuoteContent } from "./Content";
import * as RadixDialog from "@radix-ui/react-dialog";
import styles from "./style.module.scss";

type TSaveQuoteDialog = {
    rootProps?: RadixDialog.DialogProps;
    dialogData: TSaveQuoteContent,
} & TDialog;

export default function SaveQuoteDialog ({ rootProps, dialogData, ...props }: TSaveQuoteDialog) {
    const [isDialogOpen, setDialogOpen] = useState<boolean | undefined>();
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (rootProps?.open) {
            setDialogOpen(undefined);
            setSubmitted(false);
        }
    }, [rootProps?.open]);

    const onClose = useCallback(() => {
        setDialogOpen(false);
        setSubmitted(false);
        (rootProps?.onOpenChange as ((open: boolean) => void))?.(false);
    }, [rootProps?.onOpenChange]);

    const onOpenChange = useCallback((open: boolean) => {
        if (!open) onClose();
        else setDialogOpen(undefined);
    }, [onClose]);

    return (
        <Dialog
            contentClassName={styles.dialog}
            title={submitted ? undefined : "Email My Quote"}
            rootProps={{ open: isDialogOpen ?? rootProps?.open, onOpenChange }}
            {...props}
        >
            <SaveQuoteContent
                {...dialogData}
                onClose={onClose}
                onSubmitted={() => setSubmitted(true)}
            />
        </Dialog>
    );
}