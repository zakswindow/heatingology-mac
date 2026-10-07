'use client';

import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from "./styles.module.scss";

export default function CardScrollableContainer({
    sectionName,
    items,
    maxItems,
    onSeeMore,
    seeMoreText = "See More",
    className = "",
    showSeeMore = true,
    keepHorizontal = false,
    showScrollButtons = false
}: {
    sectionName: {
        title: string,
        subHeading?: string
    };
    items: React.ReactNode[];
    maxItems: number;
    showSeeMore: boolean;
    onSeeMore?: () => void;
    seeMoreText?: string;
    className?: string;
    keepHorizontal?: boolean;
    showScrollButtons?: boolean;
}) {

    const viewportRef = useRef<HTMLDivElement | null>(null);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [displayCount, setDisplayCount] = useState(maxItems);

    const onWheel = useCallback((e: WheelEvent) => {
        const el = viewportRef.current;
        if (!el) return;

        const maxScrollLeft = el.scrollWidth - el.clientWidth;
        if (maxScrollLeft <= 0 || e.deltaY === 0 || e.deltaX !== 0) return;

        const dy = e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;

        const atStart = el.scrollLeft <= 0;
        const atEnd = el.scrollLeft >= maxScrollLeft - 1;

        if ((dy < 0 && atStart) || (dy > 0 && atEnd)) return;

        try {
            e.preventDefault();
        } catch (e) {}

        el.scrollLeft = Math.min(maxScrollLeft, Math.max(0, el.scrollLeft + dy));
    }, []);

    const scrollLeft = () => {
        const el = viewportRef.current;
        if (!el) return;
        el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    };

    const scrollRight = () => {
        const el = viewportRef.current;
        if (!el) return;
        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    };

    useEffect(() => {
        const el = viewportRef.current;
        if (!el) return;

        // update current page + total pages
        const update = () => {
            const totalWidth = el.scrollWidth;
            const viewWidth = el.clientWidth;
            const totalPages = Math.ceil(totalWidth / viewWidth);
            const page = Math.round(el.scrollLeft / viewWidth);
            setPages(totalPages);
            setCurrentPage(page);
        };

        update();

        // attach listeners
        el.addEventListener("wheel", onWheel, { passive: false });
        el.addEventListener("scroll", update);
        window.addEventListener("resize", update);

        return () => {
            el.removeEventListener("wheel", onWheel);
            el.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, [onWheel]);

    const displayItems = items.slice(0, displayCount);
    const shouldShowSeeMore = showSeeMore && items.length > displayCount;

    const handleSeeMore = () => {
        setDisplayCount(prev => Math.min(prev + maxItems, items.length));
        onSeeMore?.();
    };
    const navContainerCSS = keepHorizontal ? "horizontal" : ""

    return (
        <div className={`${styles.scrollAreaParent} ${className}`}>
            <h1>{sectionName.title}</h1>
            {sectionName.subHeading && <h2>{sectionName.subHeading}</h2>}
            <ScrollArea.Root className={`${styles.scrollAreaRoot} ${navContainerCSS}`} type="always" onWheel={onWheel}>
                <ScrollArea.Viewport className={`${styles.scrollableViewport} ${navContainerCSS}`} ref={viewportRef}>
                    <div className={`${styles.scrollableNavContainer} ${navContainerCSS}`}>
                        {displayItems}
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    orientation="horizontal"
                    className="flex touch-none select-none h-4 bg-gray-200 rounded-full"
                    forceMount
                >
                    <ScrollArea.Thumb className="flex-1 bg-gray-600 rounded-full" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner />
            </ScrollArea.Root>
            {shouldShowSeeMore && (
                <Button className={styles.button} onClick={handleSeeMore}>
                    <span>{seeMoreText}</span>
                    <Icon className={styles.arrow} icon={ICONS.ARROW_RIGHT} />
                </Button>
            )}
            {showScrollButtons && pages > 1 && (
                <div className={styles.buttonsWrapper}>
                    <div className={styles.pageIndicators}>
                        {Array.from({ length: pages }).map((_, i) => (
                            <span
                                key={i}
                                className={`${styles.dot} ${i === currentPage ? styles.activeDot : ""}`}
                            />
                        ))}
                    </div>

                    <div className={styles.arrowGroup}>
                        <Button onClick={scrollLeft} className={styles.leftArrow}>
                            <Icon className={styles.arrow} icon={ICONS.ARROW_LEFT} />
                        </Button>
                        <Button onClick={scrollRight} className={styles.rightArrow}>
                            <Icon className={styles.arrow} icon={ICONS.ARROW_RIGHT} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}