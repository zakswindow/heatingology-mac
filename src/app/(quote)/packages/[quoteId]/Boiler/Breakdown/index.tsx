"use client";
import { ProductType } from "@prisma/client";
import Breakdown from "@/app/(quote)/_components/Breakdown";

export default function BoilerBreakdown ({ quoteData }) {
    const quoteContent = JSON.parse(quoteData.content);

    return (
        <Breakdown
            data={quoteContent}
            productType={ProductType.boiler}
        />
    );
}