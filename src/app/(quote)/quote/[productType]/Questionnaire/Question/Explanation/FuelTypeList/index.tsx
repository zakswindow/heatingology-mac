import styles from "./style.module.scss";

export default function FuelTypeList () {
    const data = [{
        headline: `Under 1 metre`,
        content: `The flue length from the boiler to the external wall measures less than 1 metre.`
    }, {
        headline: `1-2 metres`,
        content: `The flue length from the boiler to the external wall measures between 1 and 2 metres.`
    }, {
        headline: `2-3 metres`,
        content: `The flue length from the boiler to the external wall measures between 2 and 3 metres.`
    }, {
        headline: `3+ metres`,
        content: `The flue length from the boiler to the external wall measures over 3 metres.`
    }];

    return <div className={styles.cards}>
        <div className={styles.title}> Flue Lengths Explained </div>
        {
            data.map((item) => {
                return (
                    <article key={item.headline} className={styles.card}>
                        <div className={styles.headline}> { item.headline }</div>
                        <p className={styles.content}> { item.content }</p>
                    </article>
                );
            })
        }
    </div>;
}