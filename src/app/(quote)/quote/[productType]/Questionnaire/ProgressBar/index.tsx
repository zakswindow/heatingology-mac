import classNames from "classnames";
import styles from "./style.module.scss";

type TProgressBar = {
    isStart?: boolean;
    isEnd?: boolean;
    curPos: number;
    total: number;
    className?: string;
    progressBarClassName?: string;
}
export default function ProgressBar ({
    curPos,
    total,
    isStart = false,
    isEnd = false,
    className = "",
    progressBarClassName = ""
}: TProgressBar) {
    let percent = 0;
    let roundedValue = 0;
 
    if (isEnd) {
        roundedValue = 95;
    } else if (!isStart) {
        percent = (curPos / total) * 100;
        roundedValue = Math.round(percent / 10) * 10;
    }

    return (
        <div
            role="progressbar"
            className={classNames(styles.progressBar, className)}
        >
            <div
                style={{ width: `${roundedValue}%` }}
                className={classNames(styles.progress, progressBarClassName)}
            /> 
        </div>
    );
}