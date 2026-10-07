"use client";
import Breakdown from "@/app/(quote)/_components/Breakdown";
import { jsonParse } from "@/lib/_parser";
import { ProductType } from "@prisma/client";

export default function BoilerRepairBreakdown ({ quoteData }) {
    const quoteContent = jsonParse(quoteData.content);
    return (
        <Breakdown
            data={quoteContent}
            productType={ProductType.boiler_repair}
        />
    );
}