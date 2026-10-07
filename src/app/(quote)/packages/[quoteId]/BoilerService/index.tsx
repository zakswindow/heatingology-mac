import { Quote } from "@prisma/client";
import BoilerServicingCard from "./Card";
import styles from "./style.module.scss";
import BoilerServiceBreakdown from "./Breakdown";
import Faqs from "@/components/Section/Faqs";
import HaveQuestions from "@/components/Section/HaveQuestions";
import { prisma } from "@/lib/prisma";
import { FAQS_BOILER_SERVICE } from "@/lib/data/_boilerService.faqs";
import KeyInfo from "../EvCharger/KeyInfo";

type TBoilerServicing = { quoteData: Quote; }
export default async function BoilerService ({ quoteData }: TBoilerServicing) {
    const packages = await prisma.product.findMany({ where: { productType: quoteData.productType } });

    return (
        <section className={styles.page}>
            <div>
                <div className={styles.title}> Choose your boiler pricing plan </div>
                <div className={styles.selection}>
                    <KeyInfo quoteData={quoteData} />
                </div>
            </div>
            <section className={styles.cards}>
                {
                    packages.map((item) => {
                        return (
                            <BoilerServicingCard
                                quoteData={quoteData}
                                key={item.model}
                                product={item}
                            />
                        );
                    })
                }
            </section>
            <section>
                <BoilerServiceBreakdown quoteData={quoteData} />
            </section>
            <Faqs className={styles.faqs} faqs={FAQS_BOILER_SERVICE.slice(0, 5)} showViewAll={false} />
            <HaveQuestions className={styles.haveQuestions} />
        </section>
    );
}