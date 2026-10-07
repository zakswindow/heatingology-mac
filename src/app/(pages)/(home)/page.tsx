import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
    title: "Heatingology | Boiler Installation, Repair & Servicing UK",
    description: "Fixed-price heating for Islington, Camden, Hackney, Enfield, Barnet, Newham, Havering, Bromley, Lewisham, Thurrock & more. Boiler install from £1,500, repairs £85, 4.8 stars.",
    openGraph: {
        title: "Heatingology | Boiler Installation, Repair & Servicing London & Essex",
        description: "Fixed-price heating for Islington, Camden, Hackney, Enfield, Barnet, Newham, Havering, Bromley, Lewisham, Thurrock & more. Boiler install from £1,500, repairs £85, 4.8 stars.",
    },
};

export default function HomePage () {
    return <HomeClient />;
}
