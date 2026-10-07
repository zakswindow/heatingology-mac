import Button from "@/components/Button";
import { useCallback } from "react";
import styles from "./style.module.scss";
import Cookies from "js-cookie";
import PrivacyPreferencesDialog from "@/components/Dialog/Modal/PrivacyPreferences";
import { setConsent } from "@/lib/_cookies";

export default function ConsentContent ({ onClose }){
    const consentMessage = `By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts. View our Privacy Policy for more information.`;

    // TRUE: accpeted; FALSE: declined.
    const onConfirm = useCallback( (choice: boolean) => () => {
        onClose();
        setConsent(choice.toString());
    }, [onClose]);

    return (
        <>
            <p className={styles.consentMessage}> {consentMessage} </p>
            <div className={styles.buttons}>
                <Button className={styles.button} variant="outline" onClick={onConfirm(false)}> Decline </Button>
                <Button className={styles.button} onClick={onConfirm(true)}> Accept </Button>
                <PrivacyPreferencesDialog
                    onClose={onClose}
                    trigger={
                        <Button className={`${styles.preferences} ${styles.button}`} variant="outline"> Preference </Button>
                    }
                />
            </div>
        </>
    );
}