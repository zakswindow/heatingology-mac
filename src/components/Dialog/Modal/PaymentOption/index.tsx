import Dialog from "../..";
import PaymentOptionContent from "./Content";
import styles from "./style.module.scss";

export default function PaymentOptionDialog ({ trigger, dialogData }) {
    return (
        <Dialog
            contentClassName={styles.dialog}
            title={<div className={styles.title}>Pay monthly options</div>}
            trigger={trigger}
        >
            <PaymentOptionContent paymentData={dialogData} />
        </Dialog>
    );
}