"use client";
import Breakdown from "@/app/(quote)/_components/Breakdown";
import { jsonParse } from "@/lib/_parser";
import { useFetchProductById } from "@/lib/_queries/products.query";
import { ProductType } from "@prisma/client";

function useParseBreakdownData (quoteContent) {
    const { data, isLoading, isError } = useFetchProductById({ id: quoteContent.fromChargerToMeter?.inputValue });

    if (isLoading || isError) {
        return quoteContent;
    }

    return {
        ...quoteContent,
        fromChargerToMeter: {
            ...quoteContent.fromChargerToMeter,
            inputValue: data.result?.model
        }
    };
}

export default function EvChargerBreakdown ({ quoteData }) {
    const quoteContent = jsonParse(quoteData.content);
    const breakdownData = useParseBreakdownData(quoteContent);

    return (
        <Breakdown
            data={breakdownData}
            productType={ProductType.ev_charger}
        />
    );
}