"use client";

import { useState } from "react";
import DescriptionItem from "@/components/Texts/DescriptionItem";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import RestartDialog from "@/components/Dialog/Modal/Restart";

type TBreakdownEntry = {
    question: string;
    inputValue: unknown;
    order?: number;
    excludeFromBreakdown?: boolean;
}

function parseQuoteValue (value: unknown): string {
    if (typeof value === "boolean") {
        return value ? "Yes" : "No";
    }
    return String(value ?? "");
}

export default function Breakdown ({ data, productType }: { data: Record<string, TBreakdownEntry>; productType: string }) {
    const [open, setOpen] = useState(false);

    const breakdownData = Object.values(data)
        .filter((item) => !item.excludeFromBreakdown)
        .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity))
        .map((item) => ({
            label: `${item.order + 1}. ${item.question}`,
            value: parseQuoteValue(item.inputValue)
        }));

    return (
        <section className={styles.container}>
            <header className={styles.header}> Your Quote breakdown </header>
            <div className={styles.breakdown}>
                {
                    breakdownData.map((item) => {
                        return (<DescriptionItem
                            key={`${item.label}-${item.value}`}
                            className={styles.description}
                            {...item}
                        />);
                    })
                }
            </div>
            <RestartDialog
                productType={productType}
                rootProps={{ open, onOpenChange: setOpen }}
            />
            <Button className={styles.restart} onClick={() => setOpen(true)}>
                <Icon icon={ICONS.RESTART} />
                Restart quote
            </Button>
        </section>
    );
}