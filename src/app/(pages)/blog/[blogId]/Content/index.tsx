"use client";

import DOMPurify from "dompurify";
import Link from "next/link";
import Button from "@/components/Button";
import SpecsList from "@/components/Texts/SepcsList";
import styles from "./style.module.scss";

function renderContent(html: string) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const elements = Array.from(doc.body.children);

    return elements.map((el, i) => {
        if (el.tagName === "P" && el.classList.contains("cta-line")) {
            const anchor = el.querySelector("a");
            const text = anchor?.textContent ?? el.textContent ?? "";
            const href = anchor?.getAttribute("href");

            const button = <Button key={i} className={styles.ctaButton}>{text}</Button>;
            return href ? <Link key={i} href={href}>{button}</Link> : button;
        }

        if (el.tagName === "UL") {
            const items = Array.from(el.querySelectorAll("li")).map((li) => li.textContent ?? "");
            return <SpecsList key={i} specs={items} keyPrefix={`blog-ul-${i}`} className={styles.specsList} />;
        }

        return <div key={i} dangerouslySetInnerHTML={{ __html: el.outerHTML }} />;
    });
}

export default function BlogContent({ content }) {
    const sanitizedContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });

    return (
        <section className={styles.container}>
            {renderContent(sanitizedContent)}
        </section>
    );
}
