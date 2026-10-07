import {
    PATH_QUOTE_BOILER,
    PATH_QUOTE_BOILER_REPAIR,
    PATH_QUOTE_BOILER_SERVICE,
    PATH_QUOTE_EV_CHARGER,
    PATH_QUOTE_HEAT_PUMP,
} from "@/lib/_pathMap";
import { HERO_IMAGES } from "@/lib/_imageMap";

const config = {
    home: {
        hero_title: "Warmth Begins Here.",
        hero_subheading: "Competitive fixed pricing, and us, who treat your home like our own.",
        hero_image: HERO_IMAGES.HOME,
        hero_has_button: true,
        hero_button_text: "Upgrade My Boiler",
        hero_footnote: "Check out our {{reviews}}.",
        hero_breadcrumb: "",
        hero_cta_path: PATH_QUOTE_BOILER,
    },
    boiler: {
        hero_title: "A New Boiler, Without the Stress.",
        hero_subheading: "We make it easy, clear, and stress-free,  just how it should be.",
        hero_image: HERO_IMAGES.BOILER,
        hero_has_button: true,
        hero_button_text: "Get a fixed quote",
        hero_footnote: "Check out our {{reviews}}.",
        hero_breadcrumb: "",
        hero_cta_path: PATH_QUOTE_BOILER,
    },
    boilerRepair: {
        hero_title: "Boiler Not Working? We’ll Fix It Fast",
        hero_subheading: "From just £85, fixed-price repairs with no pressure, no surprises.",
        hero_image: HERO_IMAGES.BOILER_REPAIR,
        hero_has_button: true,
        hero_button_text: "Get My Fixed Price",
        hero_footnote: "Check out our {{reviews}}.",
        hero_breadcrumb: "",
        hero_cta_path: PATH_QUOTE_BOILER_REPAIR,
    },
    boilerServicing: {
        hero_title: "Because Your Boiler Works Hard All Year.",
        hero_subheading: "Give it the care it deserves — annual servicing from £125 with trusted, transparent support.",
        hero_image: HERO_IMAGES.BOILER_SERVICING,
        hero_has_button: true,
        hero_button_text: "Book Annual Service",
        hero_footnote: "Check out our {{reviews}}.",
        hero_breadcrumb: "",
        hero_cta_path: PATH_QUOTE_BOILER_SERVICE,
    },
    EVCharger: {
        hero_title: "Home EV charging, made simple.",
        hero_subheading: "Get a fixed quote, expert installation, and support that stays with you long after the install.",
        hero_image: HERO_IMAGES.EV_CHARGER,
        hero_has_button: true,
        hero_button_text: "Get My Fixed Price",
        hero_footnote: "Check out our {{reviews}}.",
        hero_breadcrumb: "",
        hero_cta_path: PATH_QUOTE_EV_CHARGER,
    },
    heatPump: {
        hero_title: "Lower Bills. Lower Carbon. Higher Comfort.",
        hero_subheading: "Efficient, future-ready heating for your home.",
        hero_image: HERO_IMAGES.HEAT_PUMP,
        hero_has_button: true,
        hero_button_text: "See If a Heat Pump Is Right for Me",
        hero_footnote: "Check out our {{reviews}}.",
        hero_breadcrumb: "",
        hero_cta_path: PATH_QUOTE_HEAT_PUMP,
    },
    aboutUs: {
        hero_title: "Built to Fix Heating. Designed Around People.",
        hero_subheading: "We started Heatingology to make home heating simple, transparent, and stress-free, with clear pricing, trusted engineers, and support that actually lasts.",
        hero_image: HERO_IMAGES.ABOUT_US,
        hero_has_button: false,
        hero_button_text: "",
        hero_footnote: "",
        hero_breadcrumb: "",
        hero_cta_path: "",
    }
};

export default config;
