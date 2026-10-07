'use client';
import BoilerCard from "./Card";
import { BOILER_TYPES } from "./confg";
import { FAQS } from "@/app/(pages)/faqs/_config";
import Faqs from "@/components/Section/Faqs";

export default function BoilerTypesContent () {
    return (
        <>
            {
                BOILER_TYPES.map((item) => {
                    return (
                        <BoilerCard key={item.label} data={item} />
                    );
                })
            }
            <Faqs faqs={FAQS.slice(0, 3)} />
        </>
    );
}