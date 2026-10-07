import Dialog from "@/components/Dialog";
import BoilerTypesContent from "./Content";
import BoilerTypesTrigger from "./Trigger";
import styles from './style.module.scss';

export default function BoilerTypesDialog () {
    return (
        <Dialog
            title={`Boiler types explained`}
            trigger={<BoilerTypesTrigger />}
            contentClassName={styles.dialog}
            descriptionClassName={styles.dialogDescription}
        >
            <BoilerTypesContent />
        </Dialog>
    );
}