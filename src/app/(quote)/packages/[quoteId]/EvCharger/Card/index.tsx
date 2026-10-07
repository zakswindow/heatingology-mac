"use client";

import styles from './style.module.scss';
import SpecsList from "@/components/Texts/SepcsList";
import Image from "@/components/Image";
import { useState } from 'react';
import { useFetchProductByType } from '@/lib/_queries/products.query';
import { Product, ProductType, Quote } from '@prisma/client';
import CableSelector from './CableSelector';
import PriceBox from '@/components/Card/PriceBox';
import ProductDialog from '@/components/Dialog/Modal/ProductDetails';
import WhatsIncludedDialog from '@/components/Dialog/SideSheets/WhatsIncluded';
import Tag from '@/components/Tag';
import { LOGOS } from '@/lib/_imageMap';

const TAG_LABELS: Record<string, string> = {
    POPULAR: "Popular"
};

export default function EvChargerCard ({ product, quoteData }: { product: Product; quoteData: Quote }) {
    const [selectedCable, setSelectedCable] = useState<Product | null>(null);
    const { data: cableData } = useFetchProductByType({
        productType: ProductType.ev_cable,
        sort: "modle",
        order: "asc"
    });

    const getPrice = (p: Product) => p.priceWithVat || p.price;
    const totalPrice = getPrice(product) + (selectedCable ? getPrice(selectedCable) : 0);

    return (
        <article className={styles.card}>
            <div className={styles.imageContainer}>
                {product.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {product.tags.map((tag) => (
                            <Tag tagType={tag ? tag.toString().toLowerCase() : ""} key={tag}>{TAG_LABELS[tag] ?? tag}</Tag>
                        ))}
                    </div>
                )}
                <Image src={product.productImage ?? ""} alt={product.model} fill sizes="100%" />
            </div>
            <div className={styles.details}>
                {product.brand && LOGOS[product.brand.toUpperCase()] && (
                    <div className={styles.brandContainer}>
                        <Image type="brand" src={LOGOS[product.brand.toUpperCase()]} alt={product.brand} />
                    </div>
                )}
                <h3 className={styles.name}> { product.model }</h3>
                <SpecsList className={styles.benefits} specs={product.specs} keyPrefix={product.model} />
                {
                    cableData && cableData.result && <CableSelector options={cableData.result} keyPrefix={product.id ?? ""} selected={selectedCable} onSelect={setSelectedCable} />
                }
                <PriceBox product={product} price={totalPrice} quoteId={quoteData.id} />
                <WhatsIncludedDialog productType={product.productType} triggerClassName={styles.dialogTrigger} />
                <ProductDialog
                    triggerClassName={styles.dialogTrigger}
                    dialogData={{
                        product,
                        quoteData,
                        selectedCable,
                        totalPrice
                    }}
                />
            </div>
        </article>
    );
}
