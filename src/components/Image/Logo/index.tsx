import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";
import { LOGOS } from "@/lib/_imageMap";
import classNames from "classnames";

export enum BRAND_LOGOS {
    PAYPAL = "PayPal",
    KANDA = "Kanda",
    HEATINGOLOGY = "Heatingology",
    HEATINGOLOGY_COLOURED = "Heatingology "
}

type TLogo = {
    className?: string; isColoured?: boolean;
    brand?: BRAND_LOGOS
};

function getLogoImage (brand: BRAND_LOGOS) {
    switch (brand) {
        case BRAND_LOGOS.PAYPAL:
            return LOGOS.PAYPAL;
        case BRAND_LOGOS.KANDA:
            return LOGOS.KANDA;
        case BRAND_LOGOS.HEATINGOLOGY:
            return LOGOS.HEATINGOLOGY;
        case BRAND_LOGOS.HEATINGOLOGY_COLOURED:
            return LOGOS.HEATINGOLOGY_COLOURED;
    }
}

export default function Logo ({ className, isColoured = true, brand = BRAND_LOGOS.HEATINGOLOGY }: TLogo) {
    const imageSrc = getLogoImage(brand === BRAND_LOGOS.HEATINGOLOGY ?
        isColoured ? BRAND_LOGOS.HEATINGOLOGY_COLOURED : BRAND_LOGOS.HEATINGOLOGY
        : brand);
    
    return (
        <Link
            href="/"
            className={classNames(styles.link, className)}
        >
            <Image
                className={styles.logo}
                alt={brand}
                src={imageSrc}
                // src={isColoured ? LOGOS.HEATINGOLOGY_COLOURED : LOGOS.HEATINGOLOGY}
                width={173}
                height={32}
            />
        </Link>
    );
}