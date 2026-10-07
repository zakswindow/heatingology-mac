"use client";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import ScrollableContainer from "@/components/Section/Scrollable";
import ProductCard from "./Product";
import OptionAccordion from "./OptionAccordion";
import Link from "next/link";
import { ValidFinanceRate } from "@kanda-libs/kanda-utils";
import { Product } from "@prisma/client";

type TPaymentOptionContent = {
    paymentData: {
        paymentOptions: ValidFinanceRate[];
        product: Product;
    },
    quoteId: string;
}
export default function PaymentOptionContent ({ paymentData, quoteId }: TPaymentOptionContent) {
    const { paymentOptions, product } = paymentData;

    return (
        <>
            <ScrollableContainer className={styles.content}>
                <p className={styles.description}> Spread the cost of your purchase with our flexible finance options. </p>
                <strong className={styles.productCaption}> Product: </strong>
                <ProductCard product={product} />
                <div className={styles.paymentOptions}>
                    {
                        paymentOptions.map((item) => {
                            return (
                                <OptionAccordion key={item.name} payment={item} loan={product.priceWithVat} />
                            );
                        })
                    }
                </div>
                <p className={styles.footprint}>
                    {`* Representative example. Application subject to affordability, age and status, minimum spend applies.`}
                </p>
            
            </ScrollableContainer>
            <div className={styles.footer}>
                <Link href={`/booking/${quoteId}`}>
                    <Button className={styles.button}>
                        Continue to next step
                        <Icon icon={ICONS.ARROW_RIGHT} />
                    </Button>
                </Link>
            </div>
        </>
    );
}