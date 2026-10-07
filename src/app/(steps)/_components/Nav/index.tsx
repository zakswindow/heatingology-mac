import Logo from "@/components/Image/Logo";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import Button from "@/components/Button";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import classNames from "classnames";
import HelpDialog from "@/components/Dialog/Modal/Help";

enum ITEM_STATUS {
    COMPLETED = "completed",
    IN_PROGRESS = "inProgress",
    PENDING = "pending"
};


function getItemStatus (curIndex, itemIndex) {
    if (curIndex === itemIndex + 1) {
        return ITEM_STATUS.IN_PROGRESS;
    } else if (curIndex > itemIndex + 1) {
        return ITEM_STATUS.COMPLETED;
    }
    return ITEM_STATUS.PENDING;
}

export default function StepNav ({ steps, curStepIndex }) {
    const { isLoading: isMediaQueriesLoading, isMobile } = useMediaQueries();

    return (
        <nav className={styles.navContainer}>
            <Logo />
            <ol
                className={
                    classNames(
                        styles.stepsContainer,
                        { [styles.hidden]: isMediaQueriesLoading  || (isMobile && !isMediaQueriesLoading) }
                    )}
            >
                {
                    steps.map((item, index) => {
                        const status = getItemStatus(curStepIndex, index);
                        return (
                            <li className={styles[status]} key={item.title}>
                                { status === ITEM_STATUS.COMPLETED &&
                                    <Icon className={styles.icon} icon={ICONS.CHECK_MARK_FILLED} />
                                }
                                { item.title }
                            </li>
                        );
                    })
                }
            </ol>
            
            <HelpDialog
                trigger={
                    <Button className={styles.button}>
                        <Icon icon={ICONS.HELP} />
                        Help
                    </Button>
                } />
        </nav>
    );    
}