import styles from "./style.module.scss";

export default function PolicyText ({ policy, sectionsRef }) {
    return (
        <div className={styles.policy}>
            {
                policy.map((item) => {
                    return (
                        <div
                            key={item.id}
                            ref={(el) => {
                                if (el) {
                                    sectionsRef.current.set(item.id, el);
                                }
                            }}
                        >
                            <h3 className={styles.title} id={item.id}> {item.title }</h3>
                            <div className={styles.description}>
                                {
                                    item.description.map((paragraph: string) => {
                                        return (
                                            <p key={paragraph} className={styles.paragraph}> {paragraph}</p>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}