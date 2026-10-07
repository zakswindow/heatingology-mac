import { PATH_SERVICE_BOILER, PATH_SERVICE_BOILER_REPAIR, PATH_SERVICE_BOILER_SERVICE, PATH_SERVICE_EV_CHARGER, PATH_SERVICE_HEAT_PUMP } from "@/lib/_pathMap";
import { ProductType } from "@prisma/client";

export type TNavPage = {
    label: string;
    image?: string;
    description?: string;
    location?: string;
    pages?: TNavPage[];
}

export type TNavPages = Record<string, TNavPage>
export const NAV_PAGES: TNavPages = {
    PRODUCTS_SERVICES: {
        label: "Products & Services",
        pages: [{
            label: "Get a new boiler",
            image: "https://assets.heatingology.com/landing-page/products-services/new_boiler.png",
            description: `Save time and money  and enjoy upto 15 years warranty `,
            location: PATH_SERVICE_BOILER
        }, {
            label: "Book a boiler repair",
            image: "https://assets.heatingology.com/landing-page/products-services/repair.png",
            description: `Book a fast, reliable repair and get your heating back on track.`,
            location: PATH_SERVICE_BOILER_REPAIR
        }, {
            label: "Book a boiler service",
            image: "https://assets.heatingology.com/landing-page/products-services/service.png",
            description: `Keep your boiler running safely with a quick annual service.`,
            location: PATH_SERVICE_BOILER_SERVICE
        }, {
            label: "Get a new EV charger",
            description: `Power your electric car at home with a charger that fits your budget.`,
            location: PATH_SERVICE_EV_CHARGER
        }, {
            label: "Buy a heat pumps",
            description: `Energy-efficient heating and reduce your carbon footprint at home.`,
            location: PATH_SERVICE_HEAT_PUMP
        }]
    },
    ABOUT_HEATINGOLOGY: {
        label: "About us",
        pages: [
            {
                label: "Our story",
                image: "https://assets.heatingology.com/our-story/what-we-believe.png",
                description: `Discover how Heatingology began, and why we’re passionate about helping homes stay warm.`,
                location: "/company/aboutUs"
            },
            // {
            //     label: "Customer success story",
            //     image: "https://assets.heatingology.com/buy-ev-charger/trusted-installation.png",
            //     description: `See what Sarah said about her thoughts and reviews.`,
            //     location: "/company/contactUs"
            // },
            {
                label: "Engineer registration",
                image: "https://assets.heatingology.com/our-story/qualified-engineer.jpeg",
                description: `Join our trusted network of engineers and help customers across the UK.`,
                location: "/engineerSignup"
            }
        ]

    },
    ADVICE_FAQA: {
        label: "Help",
        pages: [{
            label: "Advice",
            image: "/home/advice.png",
            description: `Explore guides, tips, and expert advice to make confident decisions.`,
            location: "/blogs"
        }, {
            label: "Contact us",
            image: "https://assets.heatingology.com/contact-us/talk-to-our-team.png",
            description: `Get in touch with our friendly team`,
            location: "/company/contactUs"
        },
        {
            label: "FAQs",
            image: "/home/faqs.png",
            description: `Find quick answers to common questions about your heating setup.`,
            location: "/faqs"
        }]
    }
};