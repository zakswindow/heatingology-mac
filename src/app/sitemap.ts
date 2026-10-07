import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.heatingology.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const blogs = await prisma.blog.findMany({
        where: { published: true },
        select: { id: true, updatedAt: true },
        orderBy: { publishedAt: "desc" },
    });

    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${BASE_URL}/blog/${blog.id}`,
        lastModified: blog.updatedAt,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${BASE_URL}/service/boiler`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/service/boilerRepair`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/service/boilerServicing`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/service/heatPump`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/service/evCharger`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.7,
        },
        {
            url: `${BASE_URL}/faqs`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/company/aboutUs`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/company/contactUs`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/engineerSignup`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.4,
        },
        {
            url: `${BASE_URL}/legal/privacyPolicy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${BASE_URL}/legal/termsConditions`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        {
            url: `${BASE_URL}/legal/cookiePolicy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.2,
        },
        ...blogEntries,
    ];
}
