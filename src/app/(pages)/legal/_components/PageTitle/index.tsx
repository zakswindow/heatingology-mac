import styles from './style.module.scss';

export default function PolicyPageTitle ({ title, effectiveDate }) {
    return (
        <>
            <h1 className={styles.title}> { title } </h1>
            <p className={styles.subTitle}> {`Effective Date: ${effectiveDate}`}</p>
        </>
    );
}