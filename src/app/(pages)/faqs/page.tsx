import type { Metadata } from "next";
import FaqsClient from "./FaqsClient";

export const metadata: Metadata = {
    title: "Heating FAQs | Common Boiler & Heating Questions Answered",
    description: "Answers to common questions about boiler installation, repairs, servicing, heat pumps, and EV chargers from Heatingology's Gas Safe heating experts.",
    openGraph: {
        title: "Heating FAQs | Common Boiler & Heating Questions Answered | Heatingology",
        description: "Answers to common questions about boiler installation, repairs, servicing, heat pumps, and EV chargers from Heatingology's Gas Safe heating experts.",
    },
};

export default function FaqsPage () {
    return <FaqsClient />;
}
