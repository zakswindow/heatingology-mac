"use client";

import Button from "@/components/Button";
import Dialog from "../..";
import HelpDialog from "../Help";
import SaveQuoteDialog from "../SaveQuote";
import ProductDialogContent from "./Content";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import { useState } from "react";
import RequestSurveyDialog from "@/components/Dialog/Modal/RequestSurvey";

export default function ProductDialog ({ dialogData, triggerClassName = "" }: { dialogData: any; triggerClassName?: string }) {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);
    const [isSaveOpen, setIsSaveOpen] = useState(false);

    const onCallbackRequest = () => {
        setIsHelpOpen(false);
        setIsCallbackOpen(true);
    };

    return (
        <>
            <Dialog
                contentClassName={styles.dialog}
                trigger={<Button className={`${styles.trigger} ${triggerClassName}`}> More Details </Button>}
                title={
                    <div className={styles.title}>
                        <Button className={styles.save} onClick={() => setIsSaveOpen(true)}>
                            <Icon icon={ICONS.ENVELOP} />
                            Save
                        </Button>
                        <Button className={styles.help} onClick={() => setIsHelpOpen(true)}>
                            <Icon icon={ICONS.HELP} />
                            Help
                        </Button>
                    </div>
                }
            >
                <ProductDialogContent {...dialogData} />
            </Dialog>
            <HelpDialog
                rootProps={{ open: isHelpOpen, onOpenChange: setIsHelpOpen }}
                onCallbackRequest={onCallbackRequest}
            />
            <RequestSurveyDialog
                contactOnly
                rootProps={{ open: isCallbackOpen, onOpenChange: setIsCallbackOpen }}
            />
            <SaveQuoteDialog
                rootProps={{ open: isSaveOpen, onOpenChange: setIsSaveOpen }}
                dialogData={{ quoteId: dialogData.quoteData?.id }}
            />
        </>
    );
}