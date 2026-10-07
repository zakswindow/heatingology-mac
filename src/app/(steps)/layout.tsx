import type { Metadata } from "next";
import styles from "./style.module.scss";

export const metadata: Metadata = {
    robots: { index: false, follow: false },
};

export default function StepLayout ({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <section className={styles.page}>
                { children }
            </section>
        </>
    );
}