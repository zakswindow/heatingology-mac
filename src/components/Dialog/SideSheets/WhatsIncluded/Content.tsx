"use client";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import HaveQuestions from "@/components/Section/HaveQuestions";
import { useFetchProductByType } from "@/lib/_queries/products.query";
import { ProductType } from "@prisma/client";

function getProductType (productType) {
    switch (productType) {
        case ProductType.boiler:
            return {
                included: ProductType.boiler_included,
                excluded: ProductType.boiler_not_included
            };
        case ProductType.ev_charger:
            return { included: ProductType.ev_included };
        default:
            return {};
    }
}

function getIntro (productType: ProductType) {
    switch (productType) {
        case ProductType.boiler:
            return `The prices you see on screen are fixed, include VAT and won't change.`;
        case ProductType.ev_charger:
            return `Every home is different, so installation requirements can vary depending on factors like the charger model, where it's being fitted, and the cable run needed. Our standard installation package includes:`;
        default:
            return '';
    }
}

function getFootprint (productType: ProductType) {
    switch (productType) {
        case ProductType.boiler:
            return `* If we find that the existing cold tank contains asbestos cement, we will drain the tank and use plastic sheets to seal the tank and it will stay inside the loft subject to water bye-laws in the local area.`;
        default:
            return "";
    }
}

export default function WhatsIncludedContent ({ productType, onClose }: { productType: ProductType; onClose?: () => void }) {
    const intro = getIntro(productType);
    const footprint = getFootprint(productType);
    const productTypes = getProductType(productType);
    const { data: includedResponse, isLoading: isIncludedLoading, isError: isIncludedError } = useFetchProductByType({ productType: productTypes.included });
    const { data: excludedResponse, isLoading: isExcludedLoading, isError: isExcludedError } = useFetchProductByType({ productType: productTypes.excluded });

    if (isIncludedLoading || isExcludedLoading) {
        return <div />;
    }

    if (isIncludedError || isExcludedError) {
        throw new Error("Fail to get data. ");
    }

    const { result: included } = includedResponse || {};
    const { result: excluded } = excludedResponse || {};

    return (
        <main className={styles.content}>
            <p className={styles.intro}> { intro }</p>
            {
                included && (
                    <>
                        {
                            included.map((item) => {
                                return (
                                    <li key={item.model} className={styles.included}>
                                        <Icon icon={ICONS.CHECK_MARK_FILLED} />
                                        { item.model }
                                    </li>
                                );
                            })
                        }
                        <hr />
                    </>
                )
            }
            {
                excluded && (
                    <>
                        <strong> {`What's not included`}</strong>
                        {
                            excluded.map((item) => {
                                return (
                                    <li key={item.model} className={styles.excluded}>
                                        <Icon icon={ICONS.CORSS_FILLED} />
                                        { item.model }
                                    </li>
                                );
                            })
                        }
                        <hr />
                    </>
                )
            }
            <p className={styles.footprint}> { footprint }</p>
            <HaveQuestions orientation="vertical" className={styles.questions} />
        </main>
    );
}
