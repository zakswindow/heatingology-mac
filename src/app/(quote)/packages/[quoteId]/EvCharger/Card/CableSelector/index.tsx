import { useCallback } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export default function CableSelector ({ options, keyPrefix, onSelect, selected }) {
    const onSelectOption = useCallback((option) => () => {
        onSelect(option);
    }, [onSelect]);

    return (
        <section>
            <div className={styles.title}> Cable length </div>
            <div className={styles.container}>
                <div className={styles.selector}>
                    {
                        options.map((item) => {
                            return <div
                                key={`${keyPrefix}${item.model}`}
                                className={classNames(styles.item, { [styles.selected]: selected && selected.id === item.id })}
                                onClick={onSelectOption(item)}>
                                <div className={styles.name}> {item.model } </div>
                                { item.price > 0 && <div className={styles.price}>{ `+£${item.price}` } </div> }
                            </div>;
                        })
                    }
                </div>
            </div>
        </section>
    );
}