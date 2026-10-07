"use client";
import styles from './style.module.scss';
import WhatsIncludedDialog from "@/components/Dialog/SideSheets/WhatsIncluded";
import ProductDialog from "@/components/Dialog/Modal/ProductDetails";
import PriceBox from "@/components/Card/PriceBox";
import Icon, { ICONS } from "@/components/Image/Icons";
import { LOGOS, PRODUCT_IMAGES } from "@/lib/_imageMap";
import Image from "@/components/Image";
import Tag from "@/components/Tag";

const TAG_LABELS: Record<string, string> = {
    POPULAR: "Popular"
};

export default function BoilerCard ({ item, quoteData }) {
    const MAX_NUM_OF_SPECS = 3;

    return (
        <article className={styles.card}>
            
            {/* <div className={styles.header}>
                <div>
                    {
                        item.financeTag && <span className={classNames(styles.tag, styles.financeTag)}> {item.financeTag}</span>
                    }
                    {
                        item.qualityTag && <span className={classNames(styles.qualityTag, styles.tag)}> {item.qualityTag}</span> 
                    }
                </div>
                {
                    item.rating > 0 &&
                        <div className={styles.rating} aria-label={`Rated ${item.rating} stars`}>
                            <StarFilledIcon aria-hidden={true} />
                            {item.rating}
                        </div>
                }
            </div> */}
            <div className={styles.imageContainer}>
                {item.tags?.length > 0 && (
                    <div className={styles.tags}>
                        {item.tags.map((tag) => (
                            <Tag tagType={tag ? tag.toString().toLowerCase() : ""} key={tag}>{TAG_LABELS[tag] ?? tag}</Tag>
                        ))}
                    </div>
                )}
                <Image type="product" src={item.productImage} alt={item.model} />
            </div>
            <div className={styles.metadata}>
                <div className={styles.brandContainer}>
                    {
                        item.brand && LOGOS[item.brand.toUpperCase()] &&
                    <figure>
                        <Image type="brand" src={LOGOS[item.brand.toUpperCase()]} alt={item.brand} />
                    </figure>
                    }
                </div>
                <h3 className={styles.name}> { item.model }</h3>
                <ul className={styles.benefits}>
                    {
                        item.specs && item.specs.slice(0, MAX_NUM_OF_SPECS).map((spec) => {
                            return (
                                <li key={`${item.model}-${spec}`}>
                                    <Icon icon={ICONS.CHECK_MARK_FILLED} />
                                    <span>{ spec }</span>
                                </li>
                            );
                        })
                    }
                </ul>
                <div className={styles.spacer} />
                <p className={styles.note}> {item.note} </p>
                <PriceBox
                    product={item}
                    price={item.priceWithVat}
                    quoteId={quoteData.id}
                />
                <WhatsIncludedDialog triggerClassName={styles.whatsIncludedTrigger} />
                <ProductDialog 
                    dialogData={{
                        product: item,
                        quoteData
                    }}
                />
            </div>
        </article>
    );
}