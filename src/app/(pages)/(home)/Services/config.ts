import { ProductType } from "@prisma/client";

export type TService = {
    image: string;
    category: string;
    headline: string;
    content: string;
    productType: ProductType;
    ctaLabel?: string;
};

export const SERVICES: TService[] = [{
    image: "/products/boilers/Worcester_combi/Worcester_8000/main_8000.png",
    category: "Boiler",
    headline: "Get a new boiler installed",
    content: "You choose the boiler, we guide you and install it safely with our vetted and  insured engineers.",
    productType: ProductType.boiler,
    ctaLabel: "See Boiler Prices"
}, {
    image: "https://assets.heatingology.com/boiler-repairs/repair.png",
    category: "Boiler",
    headline: "Book a boiler repair",
    content: "Every repair comes with a 12-month workmanship warranty and the aftercare support you need.",
    productType: ProductType.boiler_repair,
    ctaLabel: "Get It Fixed Today"
}, {
    image: "https://assets.heatingology.com/landing-page/boiler-eng-service.png",
    category: "Boiler",
    headline: "Boiler servicing",
    content: "Our engineers use AI-powered tools to deliver the thorough, reliable service your boiler deserves.",
    productType: ProductType.boiler_service,
    ctaLabel: "Book My Service"
}, {
    image: "/products/evCharger/spaceGrey/SpaceGrey_Front.png",
    category: "EV charger",
    headline: "Get a new EV charger",
    content: "Save time and money with your EV charger and enjoy upto 5 years warranty to keep peace of mind.",
    productType: ProductType.ev_charger,
    ctaLabel: "Get My EV Quote"
}, {
    image: "/products/heatpump/main.png",
    category: "Heat pumps",
    headline: "Buy a Heat pump",
    content: "You choose it. We guide you and install it with care.",
    productType: ProductType.heatPump,
    ctaLabel: "Explore Heat Pumps"
}];