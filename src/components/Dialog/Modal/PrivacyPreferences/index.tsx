import Dialog from "../..";
import PrivacyPreferencesContent from "./Content";
import styles from "./style.module.scss";

type TPrivacyPreferencesDialog = {
    trigger: React.ReactNode;
    onClose: () => void;
}

export default function PrivacyPreferencesDialog ({ trigger, onClose }: TPrivacyPreferencesDialog) {
    return (
        <Dialog
            contentClassName={styles.content}
            title={<div> Privacy Preferences</div>}
            trigger={trigger}
        >
            <PrivacyPreferencesContent onClose={onClose} />
        </Dialog>
    );
}