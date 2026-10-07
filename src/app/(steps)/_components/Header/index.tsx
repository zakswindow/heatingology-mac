"use client";
import styles from "./styles.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import StepNav from "../Nav";
import { ProductType } from "@prisma/client";
import { PURCHASE_JOURNEY, STEPS } from "./config";
import React from "react";


type TStepHeader = {
    curStep: any;
    productType: ProductType;
    className?: string;
    onBack: () => void;
    children?: React.ReactNode
}
export default function StepHeader ({ curStep, productType, onBack, children }: TStepHeader) {
    const steps = productType === ProductType.boiler ? PURCHASE_JOURNEY.boiler : PURCHASE_JOURNEY.DEFAULT;
    const curStepIndex = steps.findIndex((step) => step.title === curStep.title ) + 1;
    const totalSteps = steps.length;

    if (curStep.title === STEPS.DONE.title) {
        // Done. Show all steps done.
        return <StepNav steps={steps} curStepIndex={steps.length + 1} />;
    }

    if (curStepIndex <= 0) {
        throw new Error("Invalid process.");
    }

    return (
        <>
            <StepNav steps={steps} curStepIndex={curStepIndex} />
            <header className={styles.header}>
                <div className={styles.stepContainer}>
                    <Icon className={styles.icon} icon={curStep.icon} />
                    <span className={styles.description}>
                        <span className={styles.stepCount}> {`Step ${curStepIndex} of ${totalSteps}`}</span>
                        <span className={styles.stepTitle}> { curStep.title } </span>

                    </span>
                </div>
                {
                    curStepIndex >= 1 &&
                    <div className={styles.backContainer} onClick={onBack}>
                        <Icon icon={ICONS.CHEVRON_LEFT} />
                        Back
                    </div>
                }
                {children}
            </header>
        </>
    );
}