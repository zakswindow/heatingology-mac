"use client";
import { useCallback, useState } from "react";
import styles from "./style.module.scss";
import BoilerCard from "../Card";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import { useFetchProductByType } from "@/lib/_queries/products.query";
import { ProductType } from "@prisma/client";

export default function BoilerResults ({ quoteData, products }) {
    const MAX_PER_PAGE = 6;
    const [curLastIndex, setCurLastIndex] = useState(MAX_PER_PAGE);
    const numOfResults = products.length;
   
    // Preload data
    const { data: includedData } = useFetchProductByType({ productType: ProductType.boiler_included });
    const { data: excludedData } = useFetchProductByType({ productType: ProductType.excludedData });

    const onShowMore = useCallback(() => {
        setCurLastIndex((prev) => prev + 6);
    }, []);

    return (
        <>
            <section className={styles.products}>
                {
                    products.slice(0, curLastIndex).map((item) => {
                        return (
                            <BoilerCard
                                key={item.model}
                                item={item}
                                quoteData={quoteData}
                            />
                        );
                    })
                }
            </section>
            {
                (numOfResults > curLastIndex + 1) && 
                    <Button
                        variant="outline"
                        className={styles.showMore}
                        onClick={onShowMore}
                    > 
                        Show More 
                        <Icon icon={ICONS.PLUS} />
                    </Button>
            }
        </>
    );
}