import { forwardRef } from 'react';
import classNames from 'classnames';
import Icon, { ICONS } from '@/components/Image/Icons';
import DialogTriggerWrapper from '@/components/Dialog/DialogTriggerWrapper';
import styles from "./styles.module.scss";

type TWhatsIncludedTrigger = { className?: string; }

const WhatsIncludedTrigger = forwardRef<HTMLDivElement, TWhatsIncludedTrigger>(({ className, ...props }, ref) => {
    return (
        <DialogTriggerWrapper 
            ref={ref} 
            className={classNames(styles.whatsIncludedTrigger, className)}
            {...props}
        >
            <span className={classNames(styles.ellipsis, styles.underline)}>
                {`What's included in my installation?`}
            </span>
            <Icon icon={ICONS.EXTERNAL_LINK} />
        </DialogTriggerWrapper>
    );
});

WhatsIncludedTrigger.displayName = 'WhatsIncludedTrigger';

export default WhatsIncludedTrigger;