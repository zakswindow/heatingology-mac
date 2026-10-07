import classNames from "classnames";
import styles from "./style.module.scss";

type TCardList = {
    sectionName: {
        title: string,
        subHeading?: string
    };
    items: React.ReactNode[];
    maxItems: number;
    cols: number;
    gap?: string;
    className?: string;
}

export default function CardList ({
    sectionName,
    items,
    maxItems,
    cols = 1,
    gap,
    className
}: TCardList) {
    const moreThanMaxDisplay = items.length > maxItems;
    const displayItems = moreThanMaxDisplay ? items.slice(0, maxItems) : items;
    const containerCss = classNames(styles.cardListContainer, className);
    return (
        <section className={containerCss}>
            <h1 className={styles.headline}>{sectionName.title}</h1>
            {sectionName.subHeading && <h2 className={styles.subHeadline}>{sectionName.subHeading}</h2>}
            <section aria-label="Boilers" className={styles.cardList} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
                { displayItems }
            </section>
        </section>
    );
}