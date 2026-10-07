"use client";

import Icon, { ICONS } from "@/components/Image/Icons";
import Button from "../../Button";
import styles from "./style.module.scss";
import Tel from "@/components/Anchor/Tel";
import classNames from "classnames";
import RequestSurveyDialog from "@/components/Dialog/Modal/RequestSurvey";
import { useState } from "react";

type THaveQuestions = {
    orientation?: "horizontal" | "vertical",
    title?: string;
    className?: string;
    onCallbackOpen?: () => void;
    showSurvey?: boolean;
}

export default function HaveQuestions ({ orientation = "horizontal", title, className, onCallbackOpen, showSurvey = true }: THaveQuestions) {
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);

    const handleCallbackOpen = () => {
        onCallbackOpen?.();
        setIsCallbackOpen(true);
    };

    return (
        <section className={classNames(styles.container, className)}>
            <h3 className={styles.header}> {title ?? "Still have questions?"} </h3>
            <p className={styles.subHeader}> From our team of experts. </p>

            <div className={classNames(styles.contacts, { [styles.vertical]: orientation === "vertical" })}>
                <Button variant="outline" onClick={handleCallbackOpen}>
                    <Icon icon={ICONS.PHONE} />
                    <span>Request Callback</span>
                </Button>
                <Button variant="outline">
                    <Icon icon={ICONS.MOBILE} />
                    <span>
                        {` Call us `}
                        <Tel />
                    </span>
                </Button>
                {showSurvey && <RequestSurveyDialog />}
            </div>

            <RequestSurveyDialog
                contactOnly
                rootProps={{ open: isCallbackOpen, onOpenChange: setIsCallbackOpen }}
            />
        </section>
    );
}
