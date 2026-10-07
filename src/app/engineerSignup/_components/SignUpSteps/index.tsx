import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./style.module.scss";
import { useCallback } from "react";

enum ITEM_STATUS {
    COMPLETED = "completed",
    IN_PROGRESS = "inProgress",
    PENDING = "pending"
};

function getItemStatus (curIndex, itemIndex) {
    if (curIndex === itemIndex) {
        return ITEM_STATUS.IN_PROGRESS;
    } else if (curIndex > itemIndex) {
        return ITEM_STATUS.COMPLETED;
    }
    return ITEM_STATUS.PENDING;
}

export default function SignUpSteps ({ steps, curStepIndex, onEditStep }) {

    const onEditClick = useCallback((index: number) => () => {
        onEditStep(index);
    }, [onEditStep]);

    return (
        <ul className={styles.container}>
            {
                steps.map((item, index) => {
                    const status = getItemStatus(curStepIndex, index);
                    return (
                        <li key={item.title} className={styles[status]}>
                            { status === ITEM_STATUS.COMPLETED ?
                                <Icon className={styles.icon} icon={ICONS.CHECK_MARK_FILLED} />
                                : <span className={styles.stepCount}> { index + 1 }</span>
                            }
                            {item.title}
                            {
                                status === ITEM_STATUS.COMPLETED &&
                                <button style={{ all: "unset" }} onClick={onEditClick(index)}>
                                    <Icon className={styles.edit} icon={ICONS.EDIT} />
                                </button>
                            }
                        </li>);
                })
            }
        </ul>
    );
}