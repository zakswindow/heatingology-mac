import { ProductType } from "@prisma/client";

export enum CART_DETAILS {
    PRICE = "price",
    PACKAGE = "package",
    INSTALL_DATE = "installDate",
    INSTALL_INCLUDED = "installIncluded",
    INSTALLATION = "installtion"
}

export type TCartDetailsConfig = Partial<Record<CART_DETAILS, boolean>>;

type TProductCartDetails = Record<ProductType, TCartDetailsConfig>;

export const PRODUCT_CART_DETAILS: TProductCartDetails = {
    [ProductType.ev_charger]: {
        [CART_DETAILS.PRICE]: true,
        [CART_DETAILS.PACKAGE]: true,
        [CART_DETAILS.INSTALL_DATE]: true,
        [CART_DETAILS.INSTALLATION]: true
    },
    [ProductType.boiler]: {
        [CART_DETAILS.PRICE]: true,
        [CART_DETAILS.PACKAGE]: true,
        [CART_DETAILS.INSTALL_DATE]: true,
        [CART_DETAILS.INSTALLATION]: true

    },
    [ProductType.boiler_repair]: {
        [CART_DETAILS.PRICE]: true,
        [CART_DETAILS.PACKAGE]: true,
        [CART_DETAILS.INSTALL_DATE]: true
    },
    [ProductType.boiler_service]: {
        [CART_DETAILS.PRICE]: true,
        [CART_DETAILS.INSTALL_DATE]: true,
        [CART_DETAILS.INSTALLATION]: true
    },
    [ProductType.heatPump]: {
        [CART_DETAILS.PRICE]: true,
        [CART_DETAILS.PACKAGE]: true,
        [CART_DETAILS.INSTALL_DATE]: true
    }
};