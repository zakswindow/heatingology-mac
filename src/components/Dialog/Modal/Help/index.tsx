import Dialog from "../..";
import HelpContent from "./Content";
import HelpTrigger from "./Trigger";
import { DialogProps as RadixDialogProps } from "@radix-ui/react-dialog";
import styles from "./style.module.scss";

type THelpDialog = {
    rootProps?: RadixDialogProps;
    trigger?: React.ReactNode;
    onCallbackRequest?: () => void;
}

export default function HelpDialog ({ rootProps, trigger, onCallbackRequest }: THelpDialog) {
    return (
        <Dialog
            rootProps={rootProps}
            title={<div className={styles.title}>Need Help?</div>}
            trigger={rootProps ? undefined : (trigger || <HelpTrigger />)}
        >
            <HelpContent onCallbackRequest={onCallbackRequest} />
        </Dialog>
    );
}