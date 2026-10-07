import { Suspense } from "react";
import QuotePageContent from "./main";
import Loading from "@/app/loading";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";

export default async function QuotePage ({ params }) {
    const { productType } = await params;

    if (!productType) {
        throw new Error("Invalid quote option.");
    }

    const [boilerExtra, evChargerExtra] = await Promise.all([
        prisma.product.findMany({ where: { productType: ProductType.boiler_extra } }),
        prisma.product.findMany({ where: { productType: ProductType.ev_charger_extra } }),
    ]);

    return (
        <Suspense fallback={<Loading />}>
            <QuotePageContent productType={productType} boilerExtra={boilerExtra} evChargerExtra={evChargerExtra} />
        </Suspense>
    );
}