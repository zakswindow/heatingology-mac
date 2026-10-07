import SaveQuoteDialog from "@/components/Dialog/Modal/SaveQuote";
import Dialog from "../../../../components/Dialog";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";

export default function CartDialog ({ trigger, children, quoteId }) {
    return (
        <Dialog
            title={<>
                <SaveQuoteDialog
                    trigger={
                        <Button className={styles.saveButton}>
                            <Icon icon={ICONS.ENVELOP} />
                            Email My Quote
                        </Button>
                    } dialogData={{ quoteId }} />
            </>}
            trigger={trigger}
            contentClassName={styles.dialog}
        >
            { children }
        </Dialog>
    );
} 