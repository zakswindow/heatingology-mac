import { SERVICE_IMAGES } from "@/lib/_imageMap";
import { ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const boilerService = [{
    brand: "",
    model: "Gas Boiler Service",
    price: 149,
    productType: ProductType.boiler_service,
    productImage: SERVICE_IMAGES.BOILER_SERVICE,
    specs: [
        "Expertly serviced by certified engineers",
        "Fast and flexible appointment slots",
        "Safety-first check with every service",
        "Limescale Reducer (worth £65)"
    ]
}].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price),
        hasVat: true
    };
});