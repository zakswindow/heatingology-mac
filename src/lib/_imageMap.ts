import { QUESTIONNAIRE_IMAGES } from "@/app/(quote)/quote/[productType]/Questionnaire/ImageIcon";
import { ProductType } from "@prisma/client";

export const HOME_FOOTER_BANNER = "https://assets.heatingology.com/buy-new-boiler/footer.png";
export const SERVICE_HERO_BANNER = "/hero/service_hero.jpg";

export const LOGOS: Record<string, string> = {
    VAILLANT: "/logos/products/vaillant.svg",
    MAIN: "/logos/products/main.svg",
    WORCESTER: "/logos/products/worcester.svg",
    WORECESTER: "/logos/products/worcester.svg",
    "WORECESTER GREENSTAR" : "/logos/products/worcester.svg",
    "WORECESTER SYSTEMS" : "/logos/products/worcester.svg",
    BAXI: "/logos/products/baxi.svg",
    HEATINGOLOGY: "/logos/heatingology.svg",
    HEATINGOLOGY_COLOURED: "/logos/heatingology_coloured.svg",
    GAS_SAFE: "/logos/gas_safe.svg",
    PAYPAL: "/logos/payments/paypal.svg",
    KANDA: "/logos/payments/kanda.svg",
    HYPERVOLT: "/logos/products/hypervolt.svg"
};

export const PRODUCT_IMAGES: Record<string, string | QUESTIONNAIRE_IMAGES> = {
    BOILER: "/home/boiler.png",
    HEAT_PUMP: "/home/heatPump.png",
    EV_CHARGER: "/home/evCharger.png"
};

export const SERVICE_IMAGES: Record<string, string> = {
    BOILER: "/home/new_boiler.png",
    BOILER_SERVICE: "/services/boilerService.png",
    BOILER_REPAIR: "/services/boilerRepair.png",
    EV_CHARGER: "https://assets.heatingology.com/buy-ev-charger/hero.png",
    HEAT_PUMP: "https://assets.heatingology.com/buy-heatpump/hero.png"
};

export const QUESTIONNAIRE_ANIMATIONS: Record<string, string> = { 
    ONBOARDING_DESKTOP: "/animations/quote/onboarding.json",
    ONBOARDING_MOBILE: "/animations/quote/onboard_mobile.json",
    BOILER: "/animations/quote/boiler_search.json",
    EV_CHARGER: "/animations/quote/ev.json",
    HEAT_PUMP: "/animations/quote/heatPump.json"
};

export const ANIMATIONS = { 
    PRODUCT_CARD: "/animations/product_card.json",
    ORDER_CONFIRM: "/animations/order_confirm.json",
    BOILER: "/animations/quote/boiler_search.json",
    HEAT_PUMP: "/animations/quote/heatPump.json",
    EV_CHARGER: "/animations/quote/ev.json"
};

export const HERO_IMAGES: Record<string, string> = {
    HOME: "/hero/service_hero.jpg",
    BOILER: "https://assets.heatingology.com/buy-new-boiler/hero.jpg",
    BOILER_REPAIR: "https://assets.heatingology.com/boiler-repairs/hero.png",
    BOILER_SERVICING: "https://assets.heatingology.com/boiler-servicing/hero.png",
    EV_CHARGER: "https://assets.heatingology.com/buy-ev-charger/hero.png",
    HEAT_PUMP: "https://assets.heatingology.com/buy-heatpump/hero.png",
    ABOUT_US: "https://assets.heatingology.com/our-story/hero.png",
};

export const CONTACT_US_IMAGES: Record<string, string> = {
    TALK_TO_OUR_TEAM: 'https://assets.heatingology.com/contact-us/talk-to-our-team.png',
    NEED_SUPPORT: 'https://assets.heatingology.com/contact-us/need-support.png'
}


export function getProductImage (productType) {
    switch(productType) {
        case ProductType.boiler:
            return PRODUCT_IMAGES.BOILER;
        case ProductType.heatPump:
            return PRODUCT_IMAGES.HEAT_PUMP;
        case ProductType.ev_charger:
            return PRODUCT_IMAGES.EV_CHARGER;
    }
    return "";
}