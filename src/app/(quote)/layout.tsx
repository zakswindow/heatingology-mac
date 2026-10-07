import type { Metadata } from "next";
import "../globals.scss";
import SimpleMenu from "@/components/Menu/SimpleMenu";
import styles from "./style.module.scss";

export const metadata: Metadata = {
    title: "Heatingology",
    description: "",
    robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={styles.screen}>
            <SimpleMenu className={styles.menu} />
            {children}
        </div>
    );
}
