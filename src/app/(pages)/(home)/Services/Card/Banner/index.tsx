import Image from "@/components/Image";
import styles from "./style.module.scss";
import classNames from "classnames";
import { TService } from "../../config";

type TCardBanner = {
    isFeatured?: boolean;
    product: TService;
    isHover: boolean;
    orientation: "portrait" | "landscape";
}

export default function CardBanner ({ isFeatured, product, isHover, orientation }: TCardBanner) {
    if (isFeatured) {
        return (
            <div className={styles.featuredContainer}>
                <Image
                    className={classNames(styles.imageContainer, { [styles.hover]: isHover })}
                    type="product"
                    src={product.image}
                    alt={product.headline}
                />
            </div>
        );
    }

    if (orientation === "landscape") {
        return (
            <Image
                className={classNames(styles.imageContainer, styles.landscape, { [styles.hover]: isHover })}
                type="product"
                src={product.image}
                alt={product.headline}
            />
        );
    }

    return (
        <div className={styles.imagesAnimationContainer}>
            <div className={styles.imagesAnimation}>
                <Image 
                    className={classNames(styles.imageContainer, {
                        [styles.slideInRight]: isHover,
                        [styles.hidden]: !isHover 
                    })} 
                    type="product" 
                    src={product.image} 
                    alt={product.headline}
                />

                <Image 
                    className={classNames(styles.imageContainer, { [styles.hover]: isHover })} 
                    type="product" 
                    src={product.image} 
                    alt={product.headline}
                />

                <Image 
                    className={classNames(styles.imageContainer, {
                        [styles.slideInLeft]: isHover,
                        [styles.hidden]: !isHover 
                    })} 
                    type="product" 
                    src={product.image} 
                    alt={product.headline}
                />
            </div>
        </div>
    );
}