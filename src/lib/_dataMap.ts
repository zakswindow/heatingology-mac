import { BLOG_CATEGORIES } from "@prisma/client";

export const BLOG_CATEGORIES_MAP = {
    [BLOG_CATEGORIES.BOILER_GUIDE]: "boilerGuide",
    [BLOG_CATEGORIES.CUSTOMER_STORIES]: "customerStories",
    [BLOG_CATEGORIES.HEAT_PUMP_GUIDE]: "heatPump",
    [BLOG_CATEGORIES.HOME_HEATING]: "homeHeating",
    [BLOG_CATEGORIES.VIEW_ALL]: "viewAll",
    [BLOG_CATEGORIES.UNKONWN]: ""
};