import styles from "./style.module.scss";

type TDateInput = { label: string; }

export default function DateInput ({ label, inputProps }: TDateInput) {
    return (
        <label>
            <div className={styles.title}> { label }</div>
            <input className={styles.input} type="date" {...inputProps} />
        </label>
    );
}