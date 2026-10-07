export enum BLOG_TAGS {
    VIEW_ALL = "View All",
    HOME_HEATING = "Home Heating",
    CUSTOMER_STORIES = "Customer Stories",
    BOILER_GUIDE = "Boiler Guide",
    HEAT_PUMP_GUIDE = "Heat Pump Guide"
}

export type TBlog = {
    tag: BLOG_TAGS;
    headline: string;
    readTime: string;
    bannerUrl: string;
}

export const blogs: TBlog[] = [{
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "How to Choose the Right Boiler for Your Home",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "The Truth About Emergency Boiler Repairs",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.CUSTOMER_STORIES,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "Why Homeowners Trust Heatingology with Their Comfort",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "How to Choose the Right Boiler for Your Home 2",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.BOILER_GUIDE,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "The Truth About Emergency Boiler Repairs 2",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.CUSTOMER_STORIES,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "Why Homeowners Trust Heatingology with Their Comfort 2",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "How to Choose the Right Boiler for Your Home 3",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "The Truth About Emergency Boiler Repairs 3",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.CUSTOMER_STORIES,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "Why Homeowners Trust Heatingology with Their Comfort 3",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "How to Choose the Right Boiler for Your Home 4",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "The Truth About Emergency Boiler Repairs 4",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.CUSTOMER_STORIES,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "Why Homeowners Trust Heatingology with Their Comfort 4",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HEAT_PUMP_GUIDE,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "How to Choose the Right Boiler for Your Home 5",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "The Truth About Emergency Boiler Repairs 5",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HEAT_PUMP_GUIDE,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "Why Homeowners Trust Heatingology with Their Comfort 5",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "How to Choose the Right Boiler for Your Home 6",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.HOME_HEATING,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "The Truth About Emergency Boiler Repairs 6",
    readTime: "5 min"
}, {
    tag: BLOG_TAGS.BOILER_GUIDE,
    bannerUrl: "https://placehold.co/405x270/png",
    headline: "Why Homeowners Trust Heatingology with Their Comfort 6",
    readTime: "5 min"
}];
