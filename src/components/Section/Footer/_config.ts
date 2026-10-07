import { PATH_SOCIAL_FACEBOOK, PATH_SOCIAL_INSTAGRAM, PATH_SOCIAL_LINKEDIN, PATH_SOCIAL_X } from "@/lib/_pathMap";

export enum LINK_TYPE {
    INTERNAL,
    EXTERNAL
}

export type TFooterSectionPage = {
    title: string;
    link: string;
    type?: LINK_TYPE
}

export type TFooterSection = {
    title: string;
    pages: TFooterSectionPage[];
}

export const FOOTER_DATA: TFooterSection[] = [{
    title: "Services",
    pages: [{
        title: "New boiler",
        link: "/service/boiler"
    }, {
        title: "Repair boiler",
        link: "/service/boilerRepair"
    }, {
        title: "Boiler servicing",
        link: "/service/boilerServicing"
    }, {
        title: "Heat pumps",
        link: "/service/heatPump"
    }, {
        title: "EV Chargers",
        link: "/service/evCharger"
    }]
}, {
    title: "About us",
    pages: [{
        title: "Our story",
        link: "/company/aboutUs"
    }, {
        title: "Engineer signup",
        link: "/engineerSignup"
    }]
}, {
    title: "Help",
    pages: [{
        title: "FAQs",
        link: "/faqs"
    }, {
        title: "Contact us",
        link: "/company/contactUs"
    }, {
        title: "Advice",
        link: "/blogs"
    }]
}, {
    title: "Legal",
    pages: [{
        title: "Terms & Conditions",
        link: "/legal/termsConditions"
    }, {
        title: "Privacy Policy",
        link: "/legal/privacyPolicy"
    }, {
        title: "Cookie Policy",
        link: "/legal/cookiePolicy"
    }]
}, {
    title: "Follow us",
    pages: [{
        title: "Facebook",
        link: PATH_SOCIAL_FACEBOOK,
        type: LINK_TYPE.EXTERNAL
    }, {
        title: "X",
        link: PATH_SOCIAL_X,
        type: LINK_TYPE.EXTERNAL
    }, {
        title: "LinkedIn",
        link: PATH_SOCIAL_LINKEDIN,
        type: LINK_TYPE.EXTERNAL
    }]
}];

