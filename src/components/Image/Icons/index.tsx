import ABOUT_US_HONESTY from "@/assets/icons/about_us_honesty.svg";
import ABOUT_US_PEOPLE from "@/assets/icons/about_us_people.svg";
import ABOUT_US_TRUST from "@/assets/icons/about_us_trust.svg";
import ARROW_LEFT from "@/assets/icons/arrow_left.svg";
import ARROW_RIGHT from "@/assets/icons/arrow_right.svg";
import CALENDAR from "@/assets/icons/calendar.svg";
import CALENDAR_OUTLINE from "@/assets/icons/calendar_outline.svg";
import CART from "@/assets/icons/cart.svg";
import CHANGE from "@/assets/icons/change.svg";
import CHECK_MARK_FILLED from "@/assets/icons/check_filled.svg";
import CHEVRON_DOWN from "@/assets/icons/chevron_down.svg";
import CHEVRON_LEFT from "@/assets/icons/chevron_left.svg";
import CHEVRON_RIGHT from "@/assets/icons/chevron_right.svg";
import CROSS from "@/assets/icons/close.svg";
import CROSS_FILLED from "@/assets/icons/close_filled.svg";
import CONTACT_DETAILS from "@/assets/icons/contact_details.svg";
import COPY_LINK from "@/assets/icons/copy_link.svg";
import CUSTOMISE from "@/assets/icons/customise.svg";
import DELIVERY_TRUCK from "@/assets/icons/delivery_truck.svg";
import DISCOUNT from "@/assets/icons/discount.svg";
import EDIT from "@/assets/icons/edit.svg";
import ENVELOP from "@/assets/icons/envelop.svg";
import EXTERNAL_LINK from "@/assets/icons/external_link.svg";
import FACEBOOK from "@/assets/icons/facebook.svg";
import FINANCE from "@/assets/icons/finance.svg";
import FLUE_LOCATION from "@/assets/icons/flue_location.svg";
import GOOGLE from "@/assets/icons/google.svg";
import HELP from "@/assets/icons/help.svg";
import IN_STOCK from "@/assets/icons/in_stock.svg";
import INFO from "@/assets/icons/info.svg";
import INFO_BRAND from "@/assets/icons/info_brand.svg";
import INSTALLATION from "@/assets/icons/installation.svg";
import LINKED_IN from "@/assets/icons/linkedin.svg";
import LOCK from "@/assets/icons/lock.svg";
import MENU from "@/assets/icons/menu.svg";
import MOBILE from "@/assets/icons/mobile.svg";
import PAYMENT from "@/assets/icons/payment.svg";
import PAYPAL from "@/assets/icons/paypal.svg";
import PHONE from "@/assets/icons/phone.svg";
import PLUS from "@/assets/icons/plus.svg";
import PROPERTY from "@/assets/icons/property.svg";
import RELOCATE from "@/assets/icons/relocate.svg";
import PHOTO_UPLOAD from "@/assets/icons/request_eSurvery_upload.svg";
import REQUEST_ESURVEY from "@/assets/icons/request_eSurvey.svg";
import RESTART from "@/assets/icons/restart.svg";
import RULER from "@/assets/icons/ruler.svg";
import SEARCH from "@/assets/icons/search.svg";
import STAR from "@/assets/icons/star.svg";
import TWITTER_X from "@/assets/icons/twitter_x.svg";
import VIEW_COUNT from "@/assets/icons/view_count.svg";
import SAVE from "@/assets/icons/save.svg";

export enum ICONS {
    ARROW_RIGHT = "arrow_right",
    ARROW_LEFT = "arrow_left",

    CALENDAR = "calendar_outline",
    CALENDAR_OUTLINE = "calendar",
    CART = "cart",

    CHANGE = "change",
    CHECK_MARK_FILLED = "check_filled",
    CHEVRON_DOWN = "chevron_down",
    CHEVRON_LEFT = "chervon_left",
    CHEVRON_RIGHT = "chervon_right",
    CORSS_FILLED = "close_filled",
    CROSS = "close",
    CONTACT_DETAILS = "contact_details",
    COPY_LINK = "copy_link",
    CUSTOMISE = "customise",

    DELIVERY_TRUCK = "delivery_truck",
    DISCOUNT = "discount",

    EDIT = "edit",
    ENVELOP = "envelop",
    EXTERNAL_LINK = "external_link",

    FLUE_LOCATION = "flue_location",
    FACEBOOK = "facebook",
    FINANCE = "finance",

    GOOGLE = "google",

    HELP = "help",

    IN_STOCK = "in_stock",
    INFO = "info",
    INFO_BRAND = "info_brand",
    INSTALLATION = "installation",

    KANDA = "kanda",

    LINKED_IN = "linkedin",
    LOCK = "lock",

    MENU = "menu",
    MOBILE = "mobile",

    PAYPAL = "paypal",
    PAYMENT = "payment",
    PHONE = "phone",
    PLUS = "plus",
    PROPERTY = "property",
    PHOTO_UPLOAD = "request_eSurvery_upload.svg",


    RELOCATE = "relocate",
    REQUEST_ESURVEY = "request_eSurvey",
    RESTART = "restart",
    RULER = "ruler",

    SEARCH = "search",
    STAR = "star",
    SAVE = "save",

    TWITTER_X = "twitter_x",

    VIEW_COUNT = "view_count",

    //Icons for About Us Page, Values Component
    ABOUT_US_HONESTY = "about_us_honesty",
    ABOUT_US_PEOPLE = "about_us_people",
    ABOUT_US_TRUST = "about_us_trust"
};

type TIcon = {
    icon: ICONS;
    className?: string;
};

export default function Icon({ icon, ...props }: TIcon) {

    switch (icon) {
        case ICONS.ARROW_RIGHT:
            return <ARROW_RIGHT {...props} />;
        case ICONS.ARROW_LEFT:
            return <ARROW_LEFT {...props} />;
        case ICONS.CALENDAR:
            return <CALENDAR {...props} />;
        case ICONS.CALENDAR_OUTLINE:
            return <CALENDAR_OUTLINE {...props} />;
        case ICONS.CART:
            return <CART {...props} />;
        case ICONS.CHECK_MARK_FILLED:
            return <CHECK_MARK_FILLED {...props} />;
        case ICONS.CHEVRON_DOWN:
            return <CHEVRON_DOWN {...props} />;
        case ICONS.CHEVRON_LEFT:
            return <CHEVRON_LEFT {...props} />;
        case ICONS.CHEVRON_RIGHT:
            return <CHEVRON_RIGHT {...props} />;
        case ICONS.CORSS_FILLED:
            return <CROSS_FILLED {...props} />;
        case ICONS.CROSS:
            return <CROSS {...props} />;
        case ICONS.CONTACT_DETAILS:
            return <CONTACT_DETAILS {...props} />;
        case ICONS.COPY_LINK:
            return <COPY_LINK {...props} />;
        case ICONS.CUSTOMISE:
            return <CUSTOMISE {...props} />;
        case ICONS.DELIVERY_TRUCK:
            return <DELIVERY_TRUCK {...props} />;
        case ICONS.DISCOUNT:
            return <DISCOUNT {...props} />;
        case ICONS.ENVELOP:
            return <ENVELOP {...props} />;
        case ICONS.EXTERNAL_LINK:
            return <EXTERNAL_LINK {...props} />;
        case ICONS.FLUE_LOCATION:
            return <FLUE_LOCATION {...props} />;
        case ICONS.FACEBOOK:
            return <FACEBOOK {...props} />;
        case ICONS.GOOGLE:
            return <GOOGLE {...props} />;
        case ICONS.HELP:
            return <HELP {...props} />;
        case ICONS.IN_STOCK:
            return <IN_STOCK {...props} />;
        case ICONS.INFO:
            return <INFO {...props} />;
        case ICONS.INFO_BRAND:
            return <INFO_BRAND {...props} />;
        case ICONS.INSTALLATION:
            return <INSTALLATION {...props} />;
        case ICONS.LINKED_IN:
            return <LINKED_IN {...props} />;
        case ICONS.MENU:
            return <MENU {...props} />;
        case ICONS.MOBILE:
            return <MOBILE {...props} />;
        case ICONS.PAYMENT:
            return <PAYMENT {...props} />;
        case ICONS.PHONE:
            return <PHONE {...props} />;
        case ICONS.PLUS:
            return <PLUS {...props} />;
        case ICONS.PROPERTY:
            return <PROPERTY {...props} />;
        case ICONS.PHOTO_UPLOAD:
            return <PHOTO_UPLOAD {...props} />;
        case ICONS.RELOCATE:
            return <RELOCATE {...props} />;
        case ICONS.REQUEST_ESURVEY:
            return <REQUEST_ESURVEY {...props} />;
        case ICONS.RESTART:
            return <RESTART {...props} />;
        case ICONS.RULER:
            return <RULER {...props} />;
        case ICONS.SEARCH:
            return <SEARCH {...props} />;
        case ICONS.STAR:
            return <STAR {...props} />;
        case ICONS.TWITTER_X:
            return <TWITTER_X {...props} />;
        case ICONS.VIEW_COUNT:
            return <VIEW_COUNT {...props} />;
        case ICONS.CHANGE:
            return <CHANGE {...props} />;
        case ICONS.LOCK:
            return <LOCK {...props} />;
        case ICONS.PAYPAL:
            return <PAYPAL {...props} />;
        case ICONS.KANDA:
            // TODO: Get Kanda SVG Logo
            return <PAYMENT {...props} />;
        case ICONS.FINANCE:
            return <FINANCE {...props} />;
        case ICONS.EDIT:
            return <EDIT {...props} />;
        case ICONS.ABOUT_US_HONESTY:
            return <ABOUT_US_HONESTY {...props} />
        case ICONS.ABOUT_US_PEOPLE:
            return <ABOUT_US_PEOPLE {...props} />
        case ICONS.ABOUT_US_TRUST:
            return <ABOUT_US_TRUST {...props} />
        case ICONS.SAVE:
            return <SAVE {...props} />;
    }
}
