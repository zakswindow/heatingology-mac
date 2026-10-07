import { SERVICE_IMAGES } from "@/lib/_imageMap";
import { HtmlTag, ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const boilerRepair = [{
    model: "Book a repair",
    price: 149,
    priceWithVat: getPriceWithVat(149),
    productType: ProductType.boiler_repair,
    productImage: SERVICE_IMAGES.BOILER_SERVICE,
    specs: [
        "Limescale Reducer (worth £65)"
    ],
    description: [
        {
            "tag": HtmlTag.PARAGRAPH,
            "content": "Get a new A-rated boiler installed next day. Pay upfront or with finance."
        }
    ]
}].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price),
        hasVat: true
    };
});