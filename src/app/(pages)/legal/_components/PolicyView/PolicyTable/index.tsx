import Accordion from "@/components/Accordion";
import styles from "./style.module.scss";
import { useCallback } from "react";
import classNames from "classnames";

export default function PolicyTable ({ policy, scrollToSection, activeSection }) {
    const onHeadingClick = useCallback((sectionId: string) => () => {
        scrollToSection(sectionId);
    }, [scrollToSection]);

    return (
        <Accordion
            headerClassName={styles.header}
            contentClassName={styles.headings}
            data={[{
                trigger: "Table of Content",
                value: "toc",
                content: (
                    <section className={styles.table}>
                        {
                            policy.map((item) => {
                                if (item.title) {
                                    return (
                                        // <a href={`#${item.id}`} key={item.id}>
                                        <h3
                                            key={item.id}
                                            onClick={onHeadingClick(item.id)}
                                            className={classNames(styles.heading, { [styles.selected]: activeSection === item.id })}
                                        >
                                            { item.title }
                                        </h3>
                                        // </a>
                                    );
                                }
                            })
                        }
                    </section>
                )
            }]}
        />
    );
}