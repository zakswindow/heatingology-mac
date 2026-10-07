"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import Accordion from "@/components/Accordion";
import { HeatAssureSection } from "../../_config";
import styles from "./style.module.scss";

type Props = {
    intro: string;
    sections: HeatAssureSection[];
};

export default function HeatAssureTermsView({ intro, sections }: Props) {
    const [activeSection, setActiveSection] = useState<string>("");
    const viewportRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const handleScroll = () => {
            const scrollTop = viewport.scrollTop;
            const viewportHeight = viewport.clientHeight;

            sections.forEach((section) => {
                const el = sectionRefs.current.get(section.id);
                if (el) {
                    const { offsetTop, offsetHeight } = el;
                    if (
                        scrollTop >= offsetTop - viewportHeight / 2 &&
                        scrollTop < offsetTop + offsetHeight - viewportHeight / 2
                    ) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
    }, [sections]);

    const scrollToSection = useCallback((sectionId: string) => {
        const el = sectionRefs.current.get(sectionId);
        const viewport = viewportRef.current;
        if (el && viewport) {
            const viewportRect = viewport.getBoundingClientRect();
            const sectionRect = el.getBoundingClientRect();
            const relativeTop = sectionRect.top - viewportRect.top + viewport.scrollTop;
            viewport.scrollTo({ top: relativeTop, behavior: "smooth" });
            setActiveSection(sectionId);
        }
    }, []);

    return (
        <section className={styles.container}>
            {/* TOC sidebar */}
            <Accordion
                headerClassName={styles.tocHeader}
                contentClassName={styles.tocContent}
                data={[{
                    trigger: "Table of Contents",
                    value: "toc",
                    content: (
                        <nav className={styles.tocList}>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`${styles.tocItem} ${activeSection === section.id ? styles.tocItemActive : ""}`}
                                >
                                    {section.title}
                                </button>
                            ))}
                        </nav>
                    ),
                }]}
            />

            {/* Scrollable content */}
            <RadixScrollArea.Root>
                <RadixScrollArea.Viewport
                    ref={viewportRef}
                    style={{ height: "90vh", overflow: "auto" }}
                >
                    <div className={styles.content}>
                        <div className={styles.intro}>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {intro}
                            </ReactMarkdown>
                        </div>

                        {sections.map((section, index) => (
                            <div
                                key={section.id}
                                ref={(el) => { if (el) sectionRefs.current.set(section.id, el); }}
                                className={styles.section}
                            >
                                <h3 className={styles.sectionTitle} id={section.id}>
                                    {index + 1}. {section.title}
                                </h3>
                                <div className={styles.sectionBody}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {section.content}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}

                        <div className={styles.footer}>
                            <p><strong>Heatingology Ltd</strong></p>
                            <p>167-169 Great Portland Street, 5th Floor, London, W1W 7LT</p>
                            <p>hello@heatingology.co.uk · 0333 577 0017 · heatingology.co.uk</p>
                            <p>Registered in England and Wales · Gas Safe Registered</p>
                            <p><em>Version 1.0 · 17 May 2025</em></p>
                        </div>
                    </div>
                </RadixScrollArea.Viewport>
            </RadixScrollArea.Root>
        </section>
    );
}
