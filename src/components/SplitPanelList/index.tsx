import classNames from "classnames";
import ListItem from "./ListItem";
import styles from "./styles.module.scss";

interface PanelItem {
    image: string,
    title: string,
    text: string,
    listText?: Array<string>
}

export default function SplitPanelList({
    leftPanelText,
    rightPanelList,
    className
}: {
    leftPanelText: {
        title: string,
        text: string
    },
    rightPanelList: Array<PanelItem>,
    className?: string
}) {
    return (
        <div className={classNames(className, styles.container)}>
            <div className={styles.leftSide}>
                <div className={styles.leftContent}>
                    <h2>{leftPanelText.title}</h2>
                    <p>{leftPanelText.text}</p>
                </div>
            </div>

            <div className={styles.rightSide}>
                {rightPanelList.map((item, index) => (
                    <ListItem key={`list-${index}`} index={index} image={item.image} title={item.title} text={item.text} listText={item.listText}></ListItem>
                ))}
            </div>
        </div>
    );
}