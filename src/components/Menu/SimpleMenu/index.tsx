"use client";

import HelpDialog from "@/components/Dialog/Modal/Help";
import RequestSurveyDialog from "@/components/Dialog/Modal/RequestSurvey";
import Logo from "@/components/Image/Logo";
import styles from "./style.module.scss";
import classNames from "classnames";
import Icon, { ICONS } from "@/components/Image/Icons";
import Button from "@/components/Button";
import { useState } from "react";

export default function SimpleMenu ({ className = "" }) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);

    const onCallbackRequest = () => {
        setIsHelpOpen(false);
        setIsCallbackOpen(true);
    };

    return (
        <nav className={classNames(styles.nav, className)}>
            <Logo />
            <Button onClick={() => setIsHelpOpen(true)}>
                <Icon icon={ICONS.HELP} />
                Help
            </Button>
            <HelpDialog
                rootProps={{ open: isHelpOpen, onOpenChange: setIsHelpOpen }}
                onCallbackRequest={onCallbackRequest}
            />
            <RequestSurveyDialog
                contactOnly
                rootProps={{ open: isCallbackOpen, onOpenChange: setIsCallbackOpen }}
            />
        </nav>
    );
}