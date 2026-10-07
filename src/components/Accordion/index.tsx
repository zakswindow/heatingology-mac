'use client';
import React, { useCallback, useEffect, useState } from 'react';
import * as RadixAccordion from "@radix-ui/react-accordion";
import styles from './style.module.scss';
import classnames from 'classnames';
import classNames from 'classnames';
import Icon, { ICONS } from '../Image/Icons';
import { getBasicRootProps, getDefaultValue } from './_helper';

export type TAccordionData = {
    value: string;
    trigger: React.ReactNode;
    content: React.ReactNode;
}

type TAccordion = {
    data: TAccordionData[];
    className?: string;
    headerClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
    type?: "multiple" | "single";
    showChervon?: boolean;
    onValueChange?: (value: string | string[]) => void;
    openDefault?: boolean;
    maxItems?: number;
}

export default function Accordion ({
    data,
    className, 
    headerClassName, 
    contentClassName, 
    itemClassName = "", 
    type = "multiple",
    showChervon = true,
    onValueChange = () => {},
    openDefault = true,
    maxItems = 0
}: TAccordion) {
    if (maxItems == 0) {
        maxItems = data.length;
    }

    const defaultValue = getDefaultValue({
        enabled: openDefault,
        accordionItem: data,
        accordionType: type
    });

    const [openItem, setOpenItem] = useState<string | string[] | undefined>(defaultValue);
    const [rootProps, setRootProps] = useState<Record<string, unknown>>();

    useEffect(() => {
        const updatedRootProps = getBasicRootProps({
            enabled: openDefault,
            value: openItem,
            onValueChange: setOpenItem,
            accordionType: type
        });

        setRootProps(updatedRootProps);
    }, [openDefault, openItem, type]);

    return (
        <RadixAccordion.Root
            onValueChange={onValueChange}
            type={type}
            {...rootProps}
            className={classnames(styles.accordionRoot, className)}>
            {
                data.map(( item ) => {
                    return (
                        <RadixAccordion.Item className={itemClassName} key={item.value} value={item.value}>
                            <AccordionHeader className={headerClassName}>
                                <AccordionTrigger label={item.value}>
                                    { item.trigger }
                                    {
                                        showChervon &&
                                            <Icon className={styles.accordionChevron} icon={ICONS.CHEVRON_DOWN} aria-hidden />
                                    }
                                </AccordionTrigger>
                            </AccordionHeader>
                            <AccordionContent className={contentClassName}>
                                { item.content }
                            </AccordionContent>
                        </RadixAccordion.Item>
                    );
                })
            }
        </RadixAccordion.Root>
    );
}

function AccordionHeader ({ children, className }: RadixAccordion.AccordionHeaderProps) {
    return (
        <RadixAccordion.Header
            asChild
            className={classNames(styles.accordionHeader, className)}
        >
            <h3>
                { children }
            </h3>
        </RadixAccordion.Header>
    );
}

type TAccordionTrigger = { label?: string; } & RadixAccordion.AccordionTriggerProps;

function AccordionTrigger ({ children, label }: TAccordionTrigger) {
    return (
        <RadixAccordion.Trigger aria-label={label} className={styles.accordionTrigger} asChild>
            <div>{ children }</div>
        </RadixAccordion.Trigger>
    );
}

function AccordionContent ({ children, className }: RadixAccordion.AccordionContentProps) {    
    return (
        <RadixAccordion.Content className={classNames(styles.accordionContent, className)}>
            { children }
        </RadixAccordion.Content>
    );
}