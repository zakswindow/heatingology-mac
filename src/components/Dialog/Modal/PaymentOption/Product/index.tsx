import Image from "@/components/Image";
import { formatPriceNumber } from "@/lib/_calculations";
import { getProductImage } from "@/lib/_imageMap";
import styles from "./style.module.scss";
import { Product } from "@prisma/client";

type TProductCard = { product: Product; }

export default function ProductCard ({ product }: TProductCard) {
    return (
        <article className={styles.card}>
            <Image
                className={styles.productImage} 
                type="product" 
                src={getProductImage(product.productType)} 
                alt={product.model} />
            <div>
                <div className={styles.name}>{ product.model }</div>
                <div className={styles.price}>{ `£${formatPriceNumber(product.priceWithVat || 0)}` }</div>
            </div>
        </article>
    );
}