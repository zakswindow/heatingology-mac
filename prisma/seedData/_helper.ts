export function getPriceWithVat(price: number, hasVat = true) {
    const vatPercent = 1.2; //(100% + 20%)
    if (hasVat) {
        return Number((vatPercent * price).toFixed(2));
    }
    return price;
}