import Button from "@/components/Button";
import { preferences, preferencesIntro } from "../config";
import styles from "./style.module.scss";
import * as RadixSwitch from "@radix-ui/react-switch";
import { useCallback, useState } from "react";
import { setConsent } from "@/lib/_cookies";
import * as RadixDialog from '@radix-ui/react-dialog';

export default function PrivacyPreferencesContent ({ onClose }) {
    const [customisation, setCustomisation] = useState({});

    const onPreferenceToggle = useCallback((id: string) => (checked: boolean) => {
        setCustomisation((prev) => ({
            ...prev,
            [id]: checked
        }));
    }, []);

    const onSavePreferences = useCallback(() => {
        onClose();
        setConsent(JSON.stringify(customisation));
    }, [customisation, onClose]);

    const onAccept = useCallback(() => {
        setConsent("true");
        onClose();
    }, [onClose]);

    const onReject = useCallback(() => {
        setConsent("false");
        onClose();
    }, [onClose]);

    return (
        <section className={styles.contentContainer}>
            <section className={styles.intro}>
                <p className={styles.description}> { preferencesIntro }</p>
                <div className={styles.buttons}>
                    <Button className={styles.button} variant="outline" onClick={onReject}> Reject all cookies </Button>
                    <Button className={styles.button} onClick={onAccept}> Accept all cookies </Button>
                </div>
            </section>
            <section className={styles.details}>
                <div className={styles.sectionTitle}> Privacy Preferences </div>
                {
                    preferences.map((item) => {
                        return (
                            <div key={item.id}>
                                <dt className={styles.title}>
                                    {item.title }
                                    {
                                        item.togglable ?
                                            <RadixSwitch.Root className={styles.switch} onCheckedChange={onPreferenceToggle(item.id)}>
                                                <RadixSwitch.Thumb className={styles.thumb} />
                                            </RadixSwitch.Root>
                                            : <div> Always active </div>
                                    }
                                </dt>
                                <dd className={styles.description}> { item.description }</dd>
                            </div>
                        );
                    })
                }
                <div className={styles.buttons}>
                    <RadixDialog.Close asChild>
                        <Button className={styles.button} variant={"outline"}> Cancel </Button>
                    </RadixDialog.Close>
                    <Button className={styles.button} onClick={onSavePreferences}> Save preferences </Button>
                </div>
            </section>
        </section>
    );
}