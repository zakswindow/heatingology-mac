import styles from "./styles.module.scss";
import classNames from "classnames";
import Link from "next/link";
import Icon, { ICONS } from "@/components/Image/Icons";
import Banner from "@/components/Image/Banner";
import { PRODUCT_IMAGES } from "@/lib/_imageMap";
import { ProductType } from "@prisma/client";
import Image from "@/components/Image";
import { SERVICES } from "@/app/(pages)/(home)/Services/config";

function getImageUrl (product: ProductType) {
    switch (product) {
        case ProductType.boiler:
        case ProductType.boiler_repair:
        case ProductType.boiler_service:
            return PRODUCT_IMAGES.BOILER;

        case ProductType.heatPump:
            return PRODUCT_IMAGES.HEAT_PUMP;

        case ProductType.ev_charger:
            return PRODUCT_IMAGES.EV_CHARGER;
    }
}

export default function QuoteNav ({ navigations, isVisible, onClick }) {
    return (
        <div
            className={classNames(
                styles.container, (
                    isVisible ? styles.visible : styles.hidden
                )
            )}>
            {
                navigations.map((item => {
                    return (
                        <Link className={styles.card} href={`/quote/${item.productType}`} key={item.headline} onClick={onClick}>
                            <Image src={item.image} alt={item.label} type="product" className={styles.imageContainer} />
                            <span>{item.headline}</span>
                            <span className={styles.iconContainer}><Icon icon={ICONS.ARROW_RIGHT} className={styles.icon} /></span>
                        </Link>
                    );
                }))
            }
        </div>
    );
}