import { PATH_QUOTE_BOILER } from "@/lib/_pathMap";

const brands = {
    heading: {
        title: "Explore the Brands",
        subHeading: "Choose from industry leading experts you can rely on"
    },
    brands: [
        {
            brand: "Worcester",
            description: "Worcester Bosch is a leading UK boiler brand, trusted for reliability, efficiency, and long-lasting performance.",
            ctaLabel: "Start Your Quote",
            ctaUrl: PATH_QUOTE_BOILER
        },
        {
            brand: "Vaillant",
            description: "Vaillant is a premium boiler brand known for German engineering, high efficiency, and long-lasting reliability.",
            ctaLabel: "Explore Boiler Prices",
            ctaUrl: PATH_QUOTE_BOILER
        },
        {
            brand: "Baxi",
            description: "BAXI is a trusted UK boiler manufacturer known for dependable performance and great value.",
            ctaLabel: "Explore the Range",
            ctaUrl: PATH_QUOTE_BOILER
        },
        {
            brand: "Main",
            description: "Main Heating offers affordable, no-frills boilers built for everyday reliability.",
            ctaLabel: "See Your Options",
            ctaUrl: PATH_QUOTE_BOILER
        }
    ]
};

export default brands;
