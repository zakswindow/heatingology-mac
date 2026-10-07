import { Product } from "@prisma/client";

export function getTotalPrices ({ products }: { products: Product[] }) {
    if (!products || !products.length) {
        return {
            subTotal: 0,
            totalVat: 0,
            totalAmount: 0
        };
    }

    const subTotal = products.reduce((acc, product) => {
        return acc + product.priceWithVat;
    }, 0);

    return {
        subTotal,
        totalVat: subTotal * 0.2,
        totalAmount: subTotal
    };

}