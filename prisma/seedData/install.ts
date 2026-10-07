import { ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const installTime = [{
    model: "Morning 9:00-12:00",
    price: 0,
    productType: ProductType.install_time,
    specs: []
}, {
    model: "Afternoon 12:00-17:00",
    price: 0,
    productType: ProductType.install_time,
    specs: []
}, {
    model: "Evening 18:00-21:00",
    price: 80,
    productType: ProductType.install_time,
    specs: []
}].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price, false),
        hasVat: false
    };
});