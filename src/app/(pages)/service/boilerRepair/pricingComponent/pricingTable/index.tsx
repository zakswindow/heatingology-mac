import styles from "./styles.module.scss";

export default function PricingTable({ data, tableHeading }) {
    if (!data || data.length === 0) return null;

    return (
        <div className={styles.table_wrap}>
            <div className={styles.table} style={{ gridTemplateColumns: `repeat(${data[0].length}, 1fr)` }}>
                <div className={styles.tableHeading} style={{ gridColumn: "2 / span 2", gridRow: 1 }}>
                    {tableHeading}
                </div>
                {data.map((row, rowIdx) =>
                    row.map((cell, colIdx) => {
                        const isHeader = rowIdx === 0;
                        const cellClass = colIdx === 0 ? styles.col_left : styles.col_blue;
                        return (
                            <div
                                key={`${rowIdx}_${colIdx}`}
                                className={`${styles.cell} ${cellClass} ${isHeader ? styles.header : styles.body}`}
                                style={{ gridRow: rowIdx + 2, gridColumn: colIdx + 1 }}
                            >
                                {cell}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};