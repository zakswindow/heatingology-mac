import Image from "@/components/Image";
import { SERVICE_IMAGES } from "@/lib/_imageMap";
import { ProductType } from "@prisma/client";
import styles from "./style.module.scss";
import classNames from "classnames";

function getServiceImage ({ productType }: { productType: ProductType }) {
    switch (productType) {
        case ProductType.boiler_service:
            return SERVICE_IMAGES.BOILER_SERVICE;
        case ProductType.boiler_repair:
            return SERVICE_IMAGES.BOILER_REPAIR;
        case ProductType.heatPump:
            return SERVICE_IMAGES.HEAT_PUMP;
        case ProductType.ev_charger:
            return SERVICE_IMAGES.EV_CHARGER;
        case ProductType.boiler:
            return SERVICE_IMAGES.BOILER;
        default:
            return "";
    }
}

type TBackground = { productType: ProductType; }

export default function Background ({ productType }: TBackground) {
    return (
        <div className={classNames(styles.container, styles.ellipse, styles[productType])}>
            <Image
                alt={productType}
                src={getServiceImage({ productType })}
                width={405}
                height={188}
                className={styles.image}
            />
            <div className={styles.overlay} />
        </div>
    );
}
