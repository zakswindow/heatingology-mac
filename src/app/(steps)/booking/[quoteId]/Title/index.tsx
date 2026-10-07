import Button from '@/components/Button';
import styles from './style.module.scss';
import Icon, { ICONS } from '@/components/Image/Icons';

type TBookingTitle = {
    title: string;
    onContinue?: () => void;
    continue?: { enable?: boolean; visible?: boolean; formId?: string; };
}

function BookingTitle ({ title, onContinue, continue: continueConfig = {} }: TBookingTitle) {
    return (
        <div className={styles.container}>
            <p className={styles.title}>{title}</p>
            {
                continueConfig.visible &&
                    <Button
                        onClick={continueConfig.formId ? undefined : onContinue}
                        type={continueConfig.formId ? "submit" : "button"}
                        form={continueConfig.formId}
                        className={styles.button}
                        disabled={!continueConfig.enable}
                    >
                        Continue
                        <Icon icon={ICONS.ARROW_RIGHT} />
                    </Button>
            }
        </div>
    );
}

export default BookingTitle;