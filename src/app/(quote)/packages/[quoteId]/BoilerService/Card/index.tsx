"use client";

import styles from './style.module.scss';
import SpecsList from "@/components/Texts/SepcsList";
import Image from "@/components/Image";
import Icon, { ICONS } from "@/components/Image/Icons";
import Button from "@/components/Button";
import { useUpdateQuote } from '@/lib/_mutations/quote.mutate';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Tag from '@/components/Tag';

const TAG_LABELS: Record<string, string> = {
    POPULAR: "Popular"
};

export default function BoilerServicingCard ({ product, quoteData }) {
    const updateQuote = useUpdateQuote();
    const router = useRouter();

    const onBooking = useCallback(async () => {
        const { success } = await updateQuote.mutateAsync({
            id: quoteData.id,
            body: {
                price: product.priceWithVat ?? product.price,
                products: [{
                    action: "add",
                    product
                }]
            }
        });

        if (success) {
            router.push(`/booking/${quoteData.id}`);
        }
    }, [product, quoteData, router, updateQuote]);

    return (
        <article className={styles.card}>
            <div className={styles.banner}>
                {product.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {product.tags.map((tag) => (
                            <Tag tagType={tag ? tag.toString().toLowerCase() : ""} key={tag}>{TAG_LABELS[tag] ?? tag}</Tag>
                        ))}
                    </div>
                )}
                <Image type="product" src={product.productImage} alt={product.model} />
            </div>
            <div className={styles.details}>
                <h3 className={styles.name}> { product.model }</h3>
                <SpecsList className={styles.benefits} specs={product.specs} keyPrefix={product.model} />
                <div className={styles.price}> {`£${parseFloat(product.priceWithVat).toFixed(2)}`} </div>
                <Button className={styles.button} onClick={onBooking}>
                    Book
                    <Icon icon={ICONS.ARROW_RIGHT} />
                </Button>
            </div>
        </article>
    );
}