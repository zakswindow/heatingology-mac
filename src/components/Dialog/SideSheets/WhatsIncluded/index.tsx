"use client";
import Dialog from "@/components/Dialog";
import styles from "./style.module.scss";
import WhatsIncludedContent from "./Content";
import WhatsIncludedTrigger from "./Trigger";
import { ProductType } from "@prisma/client";
import React, { useState } from "react";

type TWhatsIncludedDialog = {
    triggerClassName?: string;
    productType?: ProductType;
    trigger?: React.ReactNode;
}

export default function WhatsIncludedDialog ({ triggerClassName = "", productType = ProductType.boiler, trigger }: TWhatsIncludedDialog) {
    const [open, setOpen] = useState(false);

    if (productType === ProductType.boiler || productType === ProductType.ev_charger) {
        return (
            <Dialog
                title={"What's included"}
                trigger={trigger || <WhatsIncludedTrigger className={triggerClassName} />}
                contentClassName={styles.dialog}
                rootProps={{ open, onOpenChange: setOpen }}
            >
                <WhatsIncludedContent productType={productType} onClose={() => setOpen(false)} />
            </Dialog>
        );
    }
    return null;
}
