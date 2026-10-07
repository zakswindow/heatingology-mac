import styles from "./style.module.scss";

export default function SignUpHeader ({ curStepIndex, steps }) {
    const totalSteps = steps.length;

    return (
        <header className={styles.header}>
            <div className={styles.stepCount}> {`Step ${curStepIndex + 1} of ${totalSteps}`} </div>
            <div className={styles.title}> {steps[curStepIndex].title} </div>
        </header>
    );
}