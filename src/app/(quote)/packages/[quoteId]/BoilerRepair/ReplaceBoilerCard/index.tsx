"use client";
import Icon, { ICONS } from "@/components/Image/Icons";
import Image from "@/components/Image";
import Button from "@/components/Button";
import { HtmlTag, Product, ProductType } from "@prisma/client";
import styles from "./style.module.scss";
import { SERVICE_IMAGES } from "@/lib/_imageMap";
import PriceBox from "@/components/Card/PriceBox";
import Link from "next/link";
import { useFetchProductByType } from "@/lib/_queries/products.query";
import { useEffect, useState } from "react";

const REPLACE_BOILER = {
    model: "Replace a boiler",
    description: [{
        tag: HtmlTag.PARAGRAPH,
        content: "Get a new A-rated boiler installed next day. Pay upfront or with finance."
    }],
    productImage: SERVICE_IMAGES.BOILER_REPAIR,
    price: 1500
};


export default function ReplaceBoilerCard () {
    const product = REPLACE_BOILER;

    const { data: productResponse, isLoading, isError } = useFetchProductByType({
        productType: ProductType.boiler,
        limit: 1,
        sort: "price",
        order: "asc" 
    });
    const [cheapestBoiler, setCheapestBoiler] = useState<Product | undefined>();

    useEffect(() => {
        if (productResponse) {
            const { result } = productResponse;
            // cheapest boiler
            setCheapestBoiler(result[0]);
        }
    }, [productResponse]);


    return (
        <article className={styles.card}>
            <Image className={styles.banner} type="product" src={product.productImage} alt={product.label} />
            <div className={styles.details}>
                <h3 className={styles.name}> { product.model} </h3>
                {
                    product.description && product.description.map((item) => {
                        if (item.tag === HtmlTag.PARAGRAPH) {
                            return <p className={styles.description} key={item}> {item.content }</p>;
                        }
                        return null;
                    })
                }
                <div className={styles.spacer} />
                {
                    cheapestBoiler &&
                        <PriceBox price={cheapestBoiler.price} product={cheapestBoiler} />
                }
                <Link href={`/quote/${ProductType.boiler}`}>
                    <Button className={styles.button}>
                        Get My Fixed Price
                        <Icon icon={ICONS.ARROW_RIGHT} />
                    </Button>
                </Link>
            </div>
        </article>
    );
}
