import HaveQuestions from "@/components/Section/HaveQuestions";
import Button from "@/components/Button";
import styles from "./style.module.scss";
import Breakdown from "./Breakdown";
import { BoilerType, ProductType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import Icon, { ICONS } from "@/components/Image/Icons";
import Faqs from "@/components/Section/Faqs";
import { FAQS } from "@/app/(pages)/faqs/_config";
import BoilerResults from "./Results";
import KeyInfo from "./KeyInfo";
import SaveQuoteDialog from "@/components/Dialog/Modal/SaveQuote";
import { FAQS_BOILER } from "@/lib/data/_boiler.faqs";

export default async function Boiler ({ quoteData }) {
    const quoteContent = JSON.parse(quoteData.content);
    const boilerType = quoteContent.wantACombiBoiler ? BoilerType.COMBI : quoteContent.currentTypeOfBoiler;
    let boilerTypeQuery = {};

    if (boilerType === BoilerType.COMBI || boilerType === BoilerType.SYSTEM) {
        boilerTypeQuery = { boilerType };
    }
    const products = await prisma.product.findMany({
        where: {
            productType: ProductType.boiler,
            ...boilerTypeQuery,
            minBath: { lte: quoteContent.numOfBathrooms?.inputValue || 1 },
            maxBath: { gte: quoteContent.numOfBathrooms?.inputValue || 1 },
            minBed: { lte: quoteContent.numOfBedrooms?.inputValue || 1 },
            maxBed: { gte: quoteContent.numOfBedrooms?.inputValue || 1 }
        },
        include: {
            description: {
                select: {
                    tag: true,
                    content: true 
                } 
            } 
        }
    });
    const numOfPackages = products.length;

    return (
        <main className={styles.page}>
            <h1> {`We have ${numOfPackages} boilers packages available`} </h1>
            <section className={styles.boilerContent}>
                <div className={styles.headerButtonsContainer}>
                <KeyInfo quoteData={quoteData} />
                <SaveQuoteDialog
                    trigger={
                        <Button className={styles.save}>
                            <Icon icon={ICONS.ENVELOP} />
                            Email My Quote
                        </Button>
                    }
                    dialogData={{ quoteId: quoteData.id }}
                />
                </div>
                <BoilerResults 
                    quoteData={quoteData} 
                    products={products}
                />
                <Breakdown quoteData={quoteData} />
                <Faqs faqs={FAQS_BOILER.slice(0, 5)} className={styles.faqs} showViewAll={false} />
                <HaveQuestions className={styles.haveQuestions} />
            </section>
        </main>
    );
}