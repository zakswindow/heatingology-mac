import type { Metadata } from "next";
import AboutUsClient from "./AboutUsClient";

export const metadata: Metadata = {
    title: "About Heatingology | UK Gas Safe Heating Experts",
    description: "Heatingology makes home heating simple, transparent, and stress-free. Vetted Gas Safe engineers, fixed pricing, 12-month warranty, and aftercare that actually cares.",
    openGraph: {
        title: "About Heatingology | UK Gas Safe Heating Experts",
        description: "Heatingology makes home heating simple, transparent, and stress-free. Vetted Gas Safe engineers, fixed pricing, 12-month warranty, and aftercare that actually cares.",
    },
};

export default function AboutUsPage () {
    return <AboutUsClient />;
}
