export type PlanKey = "essential" | "plus" | "pro";

export type Plan = {
    key: PlanKey;
    name: string;
    price: string;
    priceNum: number;
    popular: boolean;
    features: string[];
    ctaText: string;
    stripePriceId: string;
};

export const HEATASSURE_PLANS: Record<PlanKey, Plan> = {
    essential: {
        key: "essential",
        name: "Essentials",
        price: "£19",
        priceNum: 19,
        popular: false,
        features: [
            "Annual boiler service",
            "Priority booking",
            "10% off all repairs",
        ],
        ctaText: "Get Essential Cover",
        stripePriceId: "price_1TYBq4DMAymgqe09OI5ideap",
    },
    plus: {
        key: "plus",
        name: "Plus",
        price: "£29",
        priceNum: 29,
        popular: true,
        features: [
            "Annual boiler service",
            "Priority booking",
            "No labour charges",
            "Priority same/next-day callouts",
            "15% off parts",
        ],
        ctaText: "Get HeatAssure™ Plus",
        stripePriceId: "price_1TYBqKDMAymgqe09y8lrJB13",
    },
    pro: {
        key: "pro",
        name: "Pro",
        price: "£39",
        priceNum: 39,
        popular: false,
        features: [
            "Everything in Plus",
            "Emergency callouts included",
            "£50 late response guarantee",
            "Priority engineer assignment",
        ],
        ctaText: "Get Pro Cover",
        stripePriceId: "price_1TYBqeDMAymgqe09iaOiAGE9",
    },
};

export function getPlan(key: string | null | undefined): Plan {
    if (key && key in HEATASSURE_PLANS) {
        return HEATASSURE_PLANS[key as PlanKey];
    }
    return HEATASSURE_PLANS.plus;
}
