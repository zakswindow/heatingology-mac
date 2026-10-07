import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/quote/", "/packages/", "/booking/", "/status/", "/heating-cover"],
            },
        ],
        sitemap: "https://www.heatingology.co.uk/sitemap.xml",
    };
}
