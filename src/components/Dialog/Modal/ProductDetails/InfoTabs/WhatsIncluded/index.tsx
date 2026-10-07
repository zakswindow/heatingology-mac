import CartProductCard from "@/components/Card/CartProductCard";
import WhatsIncludedDialog from "@/components/Dialog/SideSheets/WhatsIncluded";
import styles from "./styles.module.scss";
import WhatsIncludedTrigger from "./Trigger";
import { useFetchProductByType } from "@/lib/_queries/products.query";
import { ProductType } from "@prisma/client";
import WhatsIncludedCard from "./Card";

function queryFeaturedIncluded () {
    return [
        "Megna Clean",
        "Wireless room thermostat",
        "Includes Condesation pipe",
        "Boiler fitting pack supplied"
    ].map((item) => `model=${encodeURI(item)}`)
        .join("&");
}


export default function WhatsIncluded ({ product }) {

    const { data: includedResponse, isLoading, isError } = useFetchProductByType({
        productType: ProductType.boiler_included,
        models: queryFeaturedIncluded()
    });
    
    if (isLoading || isError || product?.productType !== ProductType.boiler) {
        return null;
    }

    if (includedResponse && includedResponse.result) {
        const { result: includedResult } = includedResponse;
        const included = includedResult.slice(0, 3);

        return (
            <>
                <article className={styles.whatsIncluded}>
                    <dt>{`What's included?`}</dt>
                    <div className={styles.cards}>
                        {
                            included.map((item) => {
                                return <WhatsIncludedCard key={item.id} product={item} />;
                            })
                        }
                    </div>
                    <WhatsIncludedDialog
                        trigger={
                            <WhatsIncludedTrigger />
                        }
                    />
                </article>
            </>
        );
    }
}