import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from "./style.module.scss";
import DialogTriggerWrapper from '../../DialogTriggerWrapper';
import Icon, { ICONS } from '@/components/Image/Icons';

type TWhatsIncludedTrigger = { className?: string; }

const WhatsIncludedTrigger = forwardRef<HTMLDivElement, TWhatsIncludedTrigger>(({ className, ...props }, ref) => {
    return (
        <DialogTriggerWrapper 
            ref={ref} 
            className={classNames(styles.help, className)}
            {...props}
        >
            <Icon icon={ICONS.INFO} />
            <span className={classNames(styles.ellipsis, styles.underline)}>
                {`What's included in my installation?`}
            </span>
        </DialogTriggerWrapper>
    );
});

WhatsIncludedTrigger.displayName = 'WhatsIncludedTrigger';

export default WhatsIncludedTrigger;