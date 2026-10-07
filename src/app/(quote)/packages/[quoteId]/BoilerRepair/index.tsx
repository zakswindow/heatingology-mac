import { ProductType, Quote } from "@prisma/client";
import BoilerRepairCard from "./BoilerRepairCard";
import { prisma } from "@/lib/prisma";
import styles from "./style.module.scss";
import ReplaceBoilerCard from "./ReplaceBoilerCard";
import BoilerRepairBreakdown from "./Breakdown";
import Faqs from "@/components/Section/Faqs";
import HaveQuestions from "@/components/Section/HaveQuestions";
import { FAQS } from "@/app/(pages)/faqs/_config";
import Icon, { ICONS } from "@/components/Image/Icons";
import { FAQS_BOILER_REPAIR } from "@/lib/data/_boilerRepair.faqs";
import Link from "next/link";
import KeyInfo from "../Boiler/KeyInfo";

type TBoilerRepair = { quoteData: Quote; }

export default async function BoilerRepair ({ quoteData }: TBoilerRepair) {
    const products = await prisma.product.findMany({
        where: { productType: ProductType.boiler_repair },
        include: { description: true }
    });

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
                    products.map((item) => {
                        return <BoilerRepairCard
                            key={item.model}
                            product={item}
                            quoteData={quoteData}
                        />;
                    })
                }
                <ReplaceBoilerCard />
            </section>
            <BoilerRepairBreakdown quoteData={quoteData} />
            <Faqs className={styles.faqs} faqs={FAQS_BOILER_REPAIR.slice(0, 5)} showViewAll={false} />
            <HaveQuestions className={styles.haveQuestions} />
        </section>
    );
}