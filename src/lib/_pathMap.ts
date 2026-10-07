import { ProductType } from "@prisma/client";

export const PATH_HOME = `/`;
export const PATH_SERVICE_BOILER = `/service/boiler`;
export const PATH_SERVICE_BOILER_SERVICE = `/service/boilerServicing`;
export const PATH_SERVICE_BOILER_REPAIR = `/service/boilerRepair`;
export const PATH_SERVICE_EV_CHARGER = `/service/evCharger`;
export const PATH_SERVICE_HEAT_PUMP = `/service/heatPump`;
export const PATH_QUOTE_BOILER = `/quote/${ProductType.boiler}`;
export const PATH_QUOTE_BOILER_REPAIR = `/quote/${ProductType.boiler_repair}`;
export const PATH_QUOTE_BOILER_SERVICE = `/quote/${ProductType.boiler_service}`;
export const PATH_QUOTE_EV_CHARGER = `/quote/${ProductType.ev_charger}`;
export const PATH_QUOTE_HEAT_PUMP = `/quote/${ProductType.heatPump}`;
export const PATH_ENGINEER_SIGN_UP = `/engineerSignup`;
export const PATH_ADVICE = `/blogs`;

export const PATH_SOCIAL_FACEBOOK = `https://www.facebook.com/heatingology`;
export const PATH_SOCIAL_INSTAGRAM = ``;
export const PATH_SOCIAL_X = `https://x.com/heatingology`;
export const PATH_SOCIAL_LINKEDIN = `https://www.linkedin.com/company/heatingology`;