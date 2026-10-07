export function jsonValuesSum (values: Record<string, number>) {
    return Object.values(values).reduce((acc, item) => acc + item, 0);
}

export function formatPriceNumber(num: number) {
    return num.toLocaleString("en-UK");
}