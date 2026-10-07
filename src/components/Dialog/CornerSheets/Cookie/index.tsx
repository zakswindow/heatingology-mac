"use client";
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useState } from 'react';
import ConsentContent from './Content';
import styles from './style.module.scss';
import * as RadixDialog from '@radix-ui/react-dialog';
import Icon, { ICONS } from '@/components/Image/Icons';
import { getConsent } from '@/lib/_cookies';

export default function ConsentDialog() {
    const [ mounted, setMounted ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);
    const consent = getConsent();

    useEffect(() => {
        setMounted(true);

        if (consent === undefined) {
            setIsOpen(true);
        }
    }, [consent]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <RadixDialog.Root
            open={isOpen}
            modal={false}
        > 
            <RadixDialog.Portal>
                <RadixDialog.Content className={styles.content}>
                    <RadixDialog.Title className={styles.title}>
                        We value your privacy
                        <RadixDialog.Close asChild>
                            <button className={styles.close} onClick={onClose}>
                                <Icon icon={ICONS.CROSS} />
                            </button>
                        </RadixDialog.Close>
                    </RadixDialog.Title>

                    <RadixDialog.Description asChild className={styles.description}>
                        <ConsentContent onClose={onClose} />
                    </RadixDialog.Description>
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
}
