"use client";
import { ProductType } from "@prisma/client";
import BoilerRepair from "./BoilerRepair";
import BoilerServicing from "./BoilerService";
import Boiler from "./Boiler";
import styles from "./style.module.scss";
import HeatPump from "./HeatPump";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";

export function PackagesPageClient ({ quoteId }) {
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Fail to load packages.");
    }

    if (quoteResponse && !quoteResponse.success) {
        throw new Error("Fail to load packages.");
    }

    if (quoteResponse && quoteResponse.success) {
        const { result: quoteData } = quoteResponse;
        const quoteType = quoteData.productType;

        function renderPage (type: ProductType) {
            switch (type) {
                case ProductType.boiler_repair:
                    return <BoilerRepair quoteData={quoteData} />;
                case ProductType.boiler_service:
                    return <BoilerServicing quoteData={quoteData} />;
                case ProductType.boiler:
                    return <Boiler quoteData={quoteData} />;
                case ProductType.heatPump:
                    return <HeatPump quoteData={quoteData} />;
            }
        }

        return (
            <section className={styles.page}>
                {
                    renderPage(quoteType)
                }
                {/* <GenerateDialog
                rootProps={{ open: true }}
                dialogData={{ quoteId: quoteData?.id }}
            /> */}
            </section>
        );
    }
}