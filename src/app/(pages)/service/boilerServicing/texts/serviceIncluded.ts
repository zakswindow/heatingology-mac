import { PATH_QUOTE_BOILER_SERVICE } from "@/lib/_pathMap";

const serviceIncluded = {
    title: "What's included in your service?",
    description: "Your one-off annual service is just £125 and covers a full safety and performance check of your boiler. If we spot anything that may need attention, we’ll explain it clearly and record it for you with no pressure, just honest advice for next steps.",
    pricing: {
        price: "125",
        period: "per year",
        description: "A comprehensive yearly check to keep your boiler safe, efficient, and running smoothly. We inspect key components, test performance, and make sure everything is working as it should, giving you peace of mind all year round.",
        buttonText: "Book Your Annual Service",
        buttonUrl: PATH_QUOTE_BOILER_SERVICE,
        featured: true
    },
    serviceInfo: {
        title: "Service includes:",
        services: [
            "Comprehensive Safety Inspection",
            "Gas Pressure & Flue Testing",
            "Internal Component Inspection",
            "Ventilation & Combustion Analysis",
            "System Reset & Performance Test"
        ]
    },
    serviceIncludedSubtext: "All inspections are carried out to Gas Safe standards. Price includes VAT."
};

export default serviceIncluded;
