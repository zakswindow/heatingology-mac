"use client";
import PaymentOptionDialog from "@/components/Dialog/Modal/PaymentOption";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import { Product, ProductType } from "@prisma/client";
import { formatPriceNumber } from "@/lib/_calculations";
import { useEffect, useState } from "react";
import { useGetKandaRatesByPrice } from "@/lib/_queries/kanda.query";
import { featuresFlag } from "@/lib/_features";

type TPriceBox = {
    product: Product;
    price: number;
    quoteId?: string;
}

function supportRepayments (productType: ProductType) {
    switch (productType) {
        case ProductType.boiler:
        case ProductType.heatPump:
        case ProductType.ev_charger:
            return true;
        default:
            return false;
    }
}

export default function PriceBox ({ product, price, quoteId }: TPriceBox) { 
    const { data: rateData } = useGetKandaRatesByPrice({
        price,
        enabled: featuresFlag.kanda && supportRepayments(product.productType)
    });
    const [paymentOptions, setPaymentOptions] = useState([]);

    useEffect(() => {
        if (rateData) {
            const { result = [] } = rateData;
            if (result.length > 0) {
                setPaymentOptions(result);
            }
        }
    }, [rateData]);
    
    return (
        <>
            <div className={styles.price}>
                {
                    price &&
                        <div>
                            <dt className={styles.priceLabel}>Fixed price (inc. VAT)</dt>
                            <dd itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                <span itemProp="price" className={styles.priceTotal}>{`£${price}`}</span>
                            </dd>
                        </div>
                }
                {
                    paymentOptions.length > 0 &&
                        <div>
                            <dt className={styles.priceLabel}>Monthly from</dt>
                            <PaymentOptionDialog
                                trigger={
                                    <div className={styles.priceMonthly}>
                                        £{formatPriceNumber(paymentOptions[0].repayment)}
                                        <span><Icon icon={ICONS.EXTERNAL_LINK} /></span>
                                    </div>
                                }
                                dialogData={{
                                    product,
                                    prices: price,
                                    paymentOptions,
                                    quoteId
                                }}
                            />
                        </div>
                }
            </div>
            
        </>
    );
}