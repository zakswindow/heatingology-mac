"use client";
import { usePathname } from "next/navigation";
import Footer from ".";
import styles from "./style.module.scss";

export default function FooterWrapper() {
    const pathname = usePathname();
    return <Footer className={pathname === "/company/contactUs" ? styles.contactUs : undefined} />;
}
