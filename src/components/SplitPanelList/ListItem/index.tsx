import Image from "@/components/Image";
import Icon, { ICONS } from "@/components/Image/Icons";
import styles from "./styles.module.scss";

export default function ListItem({
    index,
    image,
    title,
    text,
    listText
}: {
    index: number,
    image: string,
    title: string,
    text: string,
    listText?: Array<string>
}) {
    return (
        <div key={`panel-${index}`} className={styles.listItem}>
            <Image className={styles.itemImage}
                alt={`image-panel-${index}`}
                width={300}
                height={300}
                src={image}></Image>
            <h1>{title}</h1>
            <div className={styles.textArea}>
                <p className={styles.itemText}>{text}</p>
                {listText && listText.map((item, stepIndex) => (
                    <div key={`panel-${index}-step-${stepIndex}`} className={styles.listText}>
                        <Icon icon={ICONS.CHECK_MARK_FILLED} />
                        <p>{item}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}