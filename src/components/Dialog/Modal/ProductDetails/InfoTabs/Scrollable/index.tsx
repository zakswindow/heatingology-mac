"use client";

import * as RadixScrollArea from '@radix-ui/react-scroll-area';
import React, { useEffect, useRef, useState } from 'react';
import styles from "./style.module.scss";
import classNames from 'classnames';

interface ScrollableContentWithActiveStateProps {
    sections?: {
        id: number;
        title: string;
        content: string | React.ReactNode;
    }[];
}

interface Section {
    id: number;
    title: string;
    content: React.ReactNode;
}

export default function ScrollableContentWithActiveState({ sections }: ScrollableContentWithActiveStateProps) {
    const [activeSection, setActiveSection] = useState<number>(1);
    const viewportRef = useRef<HTMLDivElement>(null);
    const sectionRefs = useRef<Map<number, HTMLElement>>(new Map());
  
    // Create sections with refs
    const scrollToSection = (section: Section): void => {
        const sectionElement = sectionRefs.current.get(section.id);
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
      
            setActiveSection(section.id);
        };
    };

    // Update active section on scroll
    useEffect(() => {
        const viewport = viewportRef.current;
        if (!viewport) return;

        const handleScroll = (): void => {
            const scrollTop = viewport.scrollTop;
            const viewportHeight = viewport.clientHeight;

            if (!sections) {
                return;
            }
      
            sections.forEach((section) => {
                const sectionElement = sectionRefs.current.get(section.id);
                if (sectionElement) {
                    const { offsetTop, offsetHeight } = sectionElement;
                    // Check if section is in view (at least 50% visible)
                    if (
                        scrollTop >= offsetTop - viewportHeight / 2 && 
                        scrollTop < offsetTop + offsetHeight - viewportHeight / 2
                    ) {
                        setActiveSection(section.id);
                    }
                }
            });
        };

        viewport.addEventListener('scroll', handleScroll);
        return () => viewport.removeEventListener('scroll', handleScroll);
    }, [sections]);

    if (!sections) {
        return null;
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.scrollableNavContainer}>
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => scrollToSection(section)}
                        className={classNames(styles.scrollableNav, { [styles.selected]: section.id === activeSection })}
                    >
                        {section.title}
                    </button>
                ))}
            </div>
      
            <RadixScrollArea.Root className={styles.scrollAreaRoot}>
                <RadixScrollArea.Viewport 
                    ref={viewportRef} 
                    className="scroll-area-viewport"
                    style={{
                        width: '100%',
                        height: '100%' 
                    }}
                >
                    <div className="content" style={{ padding: '1rem' }}>
                        {sections.map((section) => (
                            <section
                                key={section.id}
                                ref={(el) => {
                                    if (el) sectionRefs.current.set(section.id, el);
                                }}
                                className={classNames("section", styles.section)}
                                id={`section-${section.id}`}
                            >
                                {section.content}
                            </section>
                        ))}
                    </div>
                </RadixScrollArea.Viewport>
        
                <RadixScrollArea.Scrollbar
                    className="scroll-area-scrollbar"
                    orientation="vertical"
                    style={{
                        display: 'flex',
                        userSelect: 'none',
                        touchAction: 'none',
                        padding: '2px',
                        background: '#f0f0f0',
                        width: '10px'
                    }}
                >
                    <RadixScrollArea.Thumb 
                        className="scroll-area-thumb"
                        style={{
                            flex: 1,
                            background: '#888',
                            borderRadius: '10px',
                            position: 'relative'
                        }}
                    />
                </RadixScrollArea.Scrollbar>
            </RadixScrollArea.Root>
        </div>
    );
}