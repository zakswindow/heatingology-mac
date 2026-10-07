import Button from "@/components/Button";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import { formatPriceNumber } from "@/lib/_calculations";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";

export default function MobilePriceBar ({ onBooking, price }) {
    const { isMobile } = useMediaQueries();
    if (!isMobile) return null;
    return (
        <div className={styles.mobileBottomBar}>
            <div className={styles.mobilePrice}>
                <span className={styles.mobilePriceTotal}>£{formatPriceNumber(price)}</span>
            </div>
            <Button
                className={styles.mobileContinueBtn}
                onClick={async () => await onBooking()}
            >
                Continue
                <Icon icon={ICONS.ARROW_RIGHT} />
            </Button>
        </div>
    )
}