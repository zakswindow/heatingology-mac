import Faqs from "@/components/Section/Faqs";
import EvChargerBreakdown from "./Breakdown";
import { FAQS } from "@/app/(pages)/faqs/_config";
import HaveQuestions from "@/components/Section/HaveQuestions";
import styles from "./style.module.scss";
import { prisma } from "@/lib/prisma";
import { ProductType } from "@prisma/client";
import EvChargerCard from "./Card";
import KeyInfo from "./KeyInfo";
import SaveQuoteDialog from "@/components/Dialog/Modal/SaveQuote";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import EvChargerBodyClass from "./BodyClass";

export default async function EvCharger ({ quoteData }) {
    const products = await prisma.product.findMany({
        where: { productType: ProductType.ev_charger },
        include: { description: true } 
    });

    return (
        <section className={styles.page}>
            <EvChargerBodyClass />
            <h2> {`We have ${products.length} EV chargers available`}</h2>
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
                        return (
                            <EvChargerCard
                                quoteData={quoteData}
                                key={item.model}
                                product={item}
                            />
                        );
                    })
                }
            </section>
            <EvChargerBreakdown quoteData={quoteData} />
            <Faqs className={styles.faqs} faqs={FAQS.slice(0, 5)} showViewAll={false} />
            <HaveQuestions className={styles.haveQuestions} showSurvey={false} />
        </section>
    );
}