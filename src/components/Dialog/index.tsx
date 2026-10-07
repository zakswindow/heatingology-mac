"use client";
import * as RadixDialog from '@radix-ui/react-dialog';
import styles from './styles.module.scss';
import classNames from 'classnames';
import Icon, { ICONS } from '../Image/Icons';

export type TDialog  = {
    trigger?: React.ReactNode;
    title?: React.ReactNode;
    children?: React.ReactNode;
    contentClassName?: string;
    descriptionClassName?: string;
    rootProps?: RadixDialog.DialogProps;
    isOverlayBlur?: boolean;
    hideCloseButton?: boolean;
}

export default function Dialog ({ trigger, title, children, contentClassName, descriptionClassName, rootProps = {}, isOverlayBlur = false, hideCloseButton = false }: TDialog) {
    return (
        <RadixDialog.Root {...rootProps}>
            {
                trigger &&
                    <RadixDialog.Trigger asChild>
                        {trigger}
                    </RadixDialog.Trigger>
            }      
            <RadixDialog.Portal>
                <RadixDialog.Overlay className={classNames(styles.dialogOverlay, { [styles.blur]: isOverlayBlur })} />
                <RadixDialog.Content className={classNames(styles.dialogContent, contentClassName)}>
                    <RadixDialog.Title className={styles.dialogTitle}>
                        {title || ""}
                        {!hideCloseButton && (
                            <RadixDialog.Close asChild>
                                <button className={styles.closeIconButton} aria-label="Close">
                                    <Icon icon={ICONS.CORSS_FILLED} />
                                </button>
                            </RadixDialog.Close>
                        )}
                    </RadixDialog.Title>
          
                    <RadixDialog.Description asChild className={descriptionClassName}>
                        <div>{children}</div>
                    </RadixDialog.Description>
          
                    
                </RadixDialog.Content>
            </RadixDialog.Portal>
        </RadixDialog.Root>
    );
};