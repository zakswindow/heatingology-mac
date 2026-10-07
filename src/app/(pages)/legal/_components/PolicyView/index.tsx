"use client";
import styles from "./style.module.scss";
import PolicyTable from "./PolicyTable";
import { useEffect, useRef, useState } from "react";
import PolicyText from "./PolicyText";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";

export default function PolicyView ({ intro, policy }) {
    const [activeSection, setActiveSection] = useState<string>("");
    const viewportRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
    const [scrollAreaHeight, setScrollAreaHeight] = useState("90vh");

    // Update active section on scroll
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const handleScroll = (): void => {
            const scrollTop = viewport.scrollTop;
            const viewportHeight = viewport.clientHeight;

            if (!policy) {
                return;
            }
      
            policy.forEach((item) => {
                const sectionElement = sectionRefs.current.get(item.title);
                if (sectionElement) {
                    const { offsetTop, offsetHeight } = sectionElement;
                    // Check if section is in view (at least 50% visible)
                    if (
                        scrollTop >= offsetTop - viewportHeight / 2 && 
                        scrollTop < offsetTop + offsetHeight - viewportHeight / 2
                    ) {
                        setActiveSection(item.title);
                    } else {
                    }
                }
            });
        };

        viewport.addEventListener('scroll', handleScroll);
        return () => viewport.removeEventListener('scroll', handleScroll);
    }, [policy]);


    useEffect(() => {
        if (viewportRef.current) {
            setScrollAreaHeight(`${viewportRef.current.scrollHeight}px`);
        }
    }, [viewportRef]);

    const scrollToSection = (sectionId: string): void => {
        const sectionElement = sectionRefs.current.get(sectionId);
        const viewport = viewportRef.current;
                
        if (sectionElement && viewport) {
            // Get the offset relative to the viewport
            const viewportRect = viewport.getBoundingClientRect();
            const sectionRect = sectionElement.getBoundingClientRect();
            const relativeTop = sectionRect.top - viewportRect.top + viewport.scrollTop;

            viewport.scrollTo({
                top: relativeTop,
                behavior: 'smooth'
            });
      
            setActiveSection(sectionId);
        };
    };

    return (
        <section className={styles.policyContainer}>
            <PolicyTable policy={policy} scrollToSection={scrollToSection} activeSection={activeSection} />
            <RadixScrollArea.Root>
                <RadixScrollArea.Viewport
                    ref={viewportRef} style={{
                        height: "90vh",
                        overflow: "auto" 
                    }}>
                    <div className={styles.intro}>
                        { intro.map((item) => {
                            return (
                                <p key={item} className={styles.paragraph}> {item} </p>
                            );
                        }) }
                        <PolicyText policy={policy} sectionsRef={sectionRefs} />
                    </div>
                </RadixScrollArea.Viewport>
            </RadixScrollArea.Root>
        </section>

    );
}