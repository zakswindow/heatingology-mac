import styles from "./style.module.scss";

export default function RadioButton ({ label }) {
    return (
        <label className={styles.container}>
            <input type="radio" value={"hello"} />
            <span>{ label }</span>
        </label>
    );
}