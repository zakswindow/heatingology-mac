"use client";
import ScrollableContentWithActiveState from "./Scrollable";
import Details from "./Details";
import WhatsIncluded from "./WhatsIncluded";
import { Product, ProductType } from "@prisma/client";
import { FAQS_EV_CHARGER } from "@/lib/data/_evCharger.faqs";
import { FAQS_BOILER } from "@/lib/data/_boiler.faqs";
import { FAQS_HEAT_PUMP } from "@/lib/data/_heatpump.faqs";
import ProductFaqs from "./Faqs";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import { formatPriceNumber } from "@/lib/_calculations";
import styles from "./style.module.scss";
import MobilePriceBar from "./MobilePriceBar";

function getFaqs (product: Product) {
    switch(product.productType) {
        case ProductType.ev_charger:
            return FAQS_EV_CHARGER;
        case ProductType.boiler:
            return FAQS_BOILER;
        case ProductType.heatPump:
            return FAQS_HEAT_PUMP;
    }
    return [];
}

type TInfoTabsProps = {
    product: Product;
    isMobile: boolean;
    price: number;
    onBooking: () => Promise<void>;
}

export default function InfoTabs ({ product, isMobile, price, onBooking }: TInfoTabsProps) {
    const sections = [{
        id: 1,
        title: "Details",
        content: <Details descriptions={product.description} specs={product.specs} dimensions={product.dimensions} />
    }, {
        id: 3,
        title: "FAQS",
        content: (<>
            <ProductFaqs faqs={getFaqs(product)} />
            <MobilePriceBar onBooking={onBooking} price={price} />
        </>)
    }];

    if (product.productType === ProductType.boiler || product.productType === ProductType.ev_charger) {
        sections.splice(1, 0, {
            id: 2,
            title: `What's included?`,
            content: <WhatsIncluded product={product} />
        });
    }

    return (
        <ScrollableContentWithActiveState
            sections={sections}
        /> 
    );
}