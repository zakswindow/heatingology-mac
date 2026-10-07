// import { QUESTIONNAIRE_IMAGES } from "@/app/(screen)/quote/[productType]/Questionnaire/ImageIcon";
import { QUESTIONNAIRE_IMAGES_DB_ENUM } from "@/app/(quote)/quote/[productType]/Questionnaire/ImageIcon/enum";
import { ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const boilerExtra = [{
    model: "In a new airing cupboard (same room, existing location)",
    specs: [],
    price: 750,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.AIRING_CUPBOARD,
    included: [],
    excluded: []
}, {
    model: "In a new airing cupboard (same room, new location)",
    specs: [],
    price: 980,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.AIRING_CUPBOARD,
    included: [],
    excluded: []
}, {
    model: "In a new location within the same room",
    specs: [],
    price: 900,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.NEW_PLACE_WITHIN_SAME_ROOM,
    included: [],
    excluded: []
}, {
    model: "In antoher room on the same floor",
    specs: [],
    price: 1150,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.ANOTHER_ROOM_SAME_FLOOR,
    included: [],
    excluded: []
}, {
    model: "In a new airing cupboard on the same floor",
    specs: [],
    price: 1200,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.AIRING_CUPBOARD,
    included: [],
    excluded: []
}, {
    model: "In a new airing cupboard on a different floor",
    specs: [],
    price: 1280,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.TO_ANOTHER_FLOOR,
    included: [],
    excluded: []
}, {
    model: "In the loft",
    specs: [],
    price: 1250,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.TO_ANOTHER_FLOOR,
    included: [],
    excluded: []
}, {
    model: "A different flue",
    specs: [],
    price: 200,
    productType: ProductType.boiler_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.TO_ANOTHER_FLOOR,
    included: [],
    excluded: []
}].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price),
        hasVat: true
    };
});