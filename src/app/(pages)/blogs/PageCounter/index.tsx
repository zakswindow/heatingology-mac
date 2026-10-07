"use client";
import Icon, { ICONS } from "@/components/Image/Icons";
import { useState } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

function getPaginationRange(current, total) {
    if (total <= 5) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }
    let range = [];
    if (current <= 3) {
        range = [1, 2, 3, '...', total];
    } else if (current >= total - 2) {
        range = [1, '...', total - 2, total - 1, total];
    } else {
        range = [1, '...', current - 1, current, current + 1, '...', total];
    }
    return range;
}

type TPageCounter = {
    totalPages?: number;
    onChange?: (value: number) => void;
}

export default function PageCounter({ totalPages = 10, onChange }: TPageCounter) {
    const [page, setPage] = useState(1);

    // Callback on page change (optional)
    const goToPage = (p) => {
        setPage(p);
        onChange?.(p);
    };

    const pageNumbers = getPaginationRange(page, totalPages);

    return (
        <nav className={styles.nav}>
            <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous"
                className={styles.navButton}

            >
                <Icon icon={ICONS.CHEVRON_LEFT} />
            </button>

            {pageNumbers.map((number, index) =>
                number === "..." ? (
                    <span
                        key={`ellipsis-${index}`} style={{
                            padding: '0 8px',
                            color: '#aaa' 
                        }}>…</span>
                ) : (
                    <button
                        key={`page-${number}`}
                        onClick={() => goToPage(number)}
                        className={ classNames(styles.pageButton, { [styles.selected]: page === number })}
                        disabled={page === number}
                    >
                        {number}
                    </button>
                ))}

            <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next"
                className={styles.navButton}
            >
                <Icon icon={ICONS.CHEVRON_RIGHT} />
            </button>
        </nav>
    );
}