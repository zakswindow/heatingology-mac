import styles from "../style.module.scss";

export default function OptionLabel ({ item }) {
    return (
        <span className={styles.optionLabel}>
            <span className={styles.optionPrice}>{`£${item.repayment}`}</span>
            {` for ${item.duration} months`}
        </span>
    );
}