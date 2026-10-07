import { ICONS } from "@/components/Image/Icons";
import { ProductType } from "@prisma/client";

type TStep = {
    icon: ICONS | null;
    title: string;
};

export const STEPS: Record<string, TStep> = {
    PAYMENT: {
        icon: ICONS.PAYMENT,
        title: "Payment"
    },
    BOOKING: {
        icon: ICONS.CALENDAR,
        title: "Booking"
    },
    CUSTOMISE: {
        icon: ICONS.CUSTOMISE,
        title: "Customise"
    },
    CONTACT: {
        icon: ICONS.CONTACT_DETAILS,
        title: "Contact Details"
    },
    DONE: {
        icon: null,
        title: "Order Confirmation"
    }
};

export const PURCHASE_JOURNEY = {
    [ProductType.boiler]: [
        STEPS.CUSTOMISE,
        STEPS.BOOKING,
        STEPS.CONTACT,
        STEPS.PAYMENT
    ],
    DEFAULT: [
        STEPS.BOOKING,
        STEPS.CONTACT,
        STEPS.PAYMENT
    ]
};
