import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
    title: "Heating Advice & Guides | Heatingology Blog",
    description: "Expert heating advice from Gas Safe engineers. Guides on boilers, heat pumps, repairs, and servicing. Help choosing the right heating solution for your home.",
    openGraph: {
        title: "Heating Advice & Guides | Heatingology Blog",
        description: "Expert heating advice from Gas Safe engineers. Guides on boilers, heat pumps, repairs, and servicing. Help choosing the right heating solution for your home.",
    },
};

export default function BlogsPage () {
    return <BlogsClient />;
}
