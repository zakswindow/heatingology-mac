import Loading from "@/app/loading";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import { Suspense } from "react";
import styles from "./style.module.scss";
import HeatPumpCard from "./Card";
import HeatPumpBreakdown from "./Breakdown";
import Faqs from "@/components/Section/Faqs";
import { FAQS_HEAT_PUMP } from "@/lib/data/_heatpump.faqs";
import HaveQuestions from "@/components/Section/HaveQuestions";
import SaveQuoteDialog from "@/components/Dialog/Modal/SaveQuote";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import KeyInfo from "../Boiler/KeyInfo";

export default async function HeatPump ({ quoteData }) {
    const quoteContent = JSON.parse(quoteData.content);
    const products = await prisma.product.findMany({
        where: {
            productType: ProductType.heatPump,
            minBath: { lte: quoteContent.numOfBathrooms?.inputValue || 1 },
            maxBath: { gte: quoteContent.numOfBathrooms?.inputValue || 1 },
            minBed: { lte: quoteContent.numOfBedrooms?.inputValue || 1 },
            maxBed: { gte: quoteContent.numOfBedrooms?.inputValue || 1 }
        } 
    });
    const numOfProducts = products.length;

    return (
        <Suspense fallback={<Loading />}>
            <section className={styles.page}>
                <h1> {`We have ${numOfProducts} products available`} </h1>
                <section className={styles.content}>
                    <div className={styles.headerButtonsContainer}>
                    
                    <KeyInfo quoteData={quoteData} />
                    <SaveQuoteDialog
                        trigger={
                            <Button className={styles.save}>
                                <Icon icon={ICONS.ENVELOP} />
                                Save for later
                            </Button>
                        }
                        dialogData={{ quoteId: quoteData.id }}
                    />
                    </div>
                    <section className={styles.cards}>
                        {
                            products.map((item) => {
                                return <HeatPumpCard
                                    key={item.model}
                                    item={item}
                                    quoteData={quoteData}
                                />;
                            })
                        }
                    </section>
                    <HeatPumpBreakdown quoteData={quoteData} />
                    <Faqs faqs={FAQS_HEAT_PUMP.slice(0, 5)} className={styles.faqs} showViewAll={false} />
                    <HaveQuestions className={styles.haveQuestions} />
                </section>
            </section>
        </Suspense>
    );
}