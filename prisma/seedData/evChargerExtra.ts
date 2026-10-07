// import { QUESTIONNAIRE_IMAGES } from "@/app/(screen)/quote/[productType]/Questionnaire/ImageIcon";
import { QUESTIONNAIRE_IMAGES_DB_ENUM } from "@/app/(quote)/quote/[productType]/Questionnaire/ImageIcon/enum";
import { ProductType } from "@prisma/client";
import { getPriceWithVat } from "./_helper";

export const evChargerExtra = [{
    model: "Up to 5 meters",
    specs: [],
    price: 0,
    productType: ProductType.ev_charger_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.ZERO_TO_5,
    included: [],
    excluded: []
}, {
    model: "6-10 meters",
    specs: [],
    price: 108,
    productType: ProductType.ev_charger_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.SIX_TO_10,
    included: [],
    excluded: []
}, {
    model: "11-15 meters",
    specs: [],
    price: 225,
    productType: ProductType.ev_charger_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.ELEVEN_TO_15,
    included: [],
    excluded: []
}, {
    model: "16+ meters",
    specs: [],
    price: 0,
    productType: ProductType.ev_charger_extra,
    productImage: QUESTIONNAIRE_IMAGES_DB_ENUM.SIXTEEN,
    included: [],
    excluded: []
}].map((item) => {
    return {
        ...item,
        priceWithVat: getPriceWithVat(item.price),
        hasVat: true
    };
});