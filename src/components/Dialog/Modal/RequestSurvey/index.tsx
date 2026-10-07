"use client";

import Button from "@/components/Button";
import Dialog, { TDialog } from "../..";
import RequestSurveyContent from "./Content";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import { useState } from "react";

type TRequestSurveyDialog = {
    rootProps?: TDialog["rootProps"];
    contactOnly?: boolean;
}

export default function RequestSurveyDialog ({ rootProps, contactOnly = false }: TRequestSurveyDialog = {}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isControlled = Boolean(rootProps);
    const resolvedRootProps = isControlled
        ? { ...rootProps, onOpenChange: (open: boolean) => {
            if (!open) setIsSubmitted(false);
            (rootProps.onOpenChange as (open: boolean) => void)?.(open);
        }}
        : { open: isOpen, onOpenChange: (open: boolean) => { if (!open) setIsSubmitted(false); setIsOpen(open); } };

    const onClose = () => isControlled
        ? (rootProps.onOpenChange as (open: boolean) => void)?.(false)
        : setIsOpen(false);

    return (
        <Dialog
            contentClassName={styles.dialog}
            title={isSubmitted ? "" : contactOnly ? "Request a callback" : "Request eSurvey"}
            rootProps={resolvedRootProps}
            trigger={isControlled ? undefined : <Button>
                <Icon icon={ICONS.REQUEST_ESURVEY} />
                {contactOnly ? "Call me back" : "Request eSurvey"}
            </Button>}
        >
            <RequestSurveyContent contactOnly={contactOnly} onClose={onClose} onSubmitted={() => setIsSubmitted(true)} />
        </Dialog>
    );
}