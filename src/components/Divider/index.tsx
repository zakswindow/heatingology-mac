import styles from "./style.module.scss";

export default function Divider ({ text }: { text: string | undefined }) {
    if (!text) {
        return <hr />;
    }

    return (
        <div className={styles.container}>
            <span className={styles.text}> { text }</span>
        </div>
    );
}