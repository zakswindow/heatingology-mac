"use client";

import styles from "./style.module.scss";
import { useEffect } from "react";
import { ProductType } from "@prisma/client";
import { ANIMATIONS } from "@/lib/_imageMap";
import Animation from "@/components/Animation";
import Spinner from "@/app/(steps)/_components/Spinner";
import { useRouter } from "next/navigation";

function getAnimationData (productType: ProductType) {
    switch(productType) {
        case ProductType.boiler:
        case ProductType.boiler_service:
        case ProductType.boiler_repair:
            return ANIMATIONS.BOILER;
        case ProductType.heatPump:
            return ANIMATIONS.HEAT_PUMP;
        case ProductType.ev_charger:
            return ANIMATIONS.EV_CHARGER;
    }
    return "";
}

export default function GenerateContent ({ quoteId, productType }) {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push(`/packages/${quoteId}`);
        }, 2000);
        return () => clearTimeout(timer);
    }, [quoteId, router]);

    return (
        <main>
            {productType === ProductType.boiler_service
                ? <Spinner />
                : <Animation src={getAnimationData(productType)} />
            }
            <h2 className={styles.contentHeader}> {productType === ProductType.boiler_service ? `Looking for the service you will need...` : `Finding your perfect boiler...`} </h2>
            {
                productType === ProductType.boiler_service ?
                null:
                <p className={styles.contentDescription}> We're comparing hundreds of boilers to find the best fit for your home. </p>
            }
        </main>
    );
}