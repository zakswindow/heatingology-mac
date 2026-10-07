import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";
import classNames from "classnames";
import styles from "./style.module.scss";
import CartDialog from "..";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import { useBookingContext } from "@/app/(steps)/booking/[quoteId]/_context";
import CartPrice from "./Price";
import { filterProductsByProductType } from "@/lib/_products";

type TCartBar = {
    className?: string;
    quoteId: string;
    dialogContent: React.ReactNode;
    continue?: { enable?: boolean; formId?: string; visible?: boolean; };
    onContinue?: () => void;
}

function CartBadge ({ quoteId }: { quoteId: string }) {
    const { data: quoteResponse } = useGetQuoteById({ id: quoteId });
    if (!quoteResponse) return null;
    const { result: quoteData } = quoteResponse;
    const { products = [] } = quoteData;
    const mainProducts = filterProductsByProductType({ products, productType: quoteData.productType });
    if (!mainProducts.length) return null;
    return <span className={styles.badge}>{mainProducts.length}</span>;
}

export default function CartBar ({ className, quoteId, dialogContent, continue: continueConfig = {}, onContinue }: TCartBar) {
    return (
        <div className={classNames(styles.container, className)}>
            <div className={styles.cart}>
                <figure className={styles.iconContainer}>
                    <Icon className={styles.icon} icon={ICONS.CART} />
                    <CartBadge quoteId={quoteId} />
                </figure>
                <div className={styles.priceContainer}>
                    <CartPrice quoteId={quoteId} />
                    <CartDialog
                        trigger={
                            <Icon className={styles.chevron} icon={ICONS.CHEVRON_DOWN} />
                        }
                        quoteId={quoteId}
                    >
                        {
                            dialogContent
                        }
                    </CartDialog>

                </div>
            </div>
            {continueConfig.visible &&
                <Button
                    className={styles.button}
                    onClick={continueConfig.formId ? undefined : onContinue}
                    type={continueConfig.formId ? "submit" : "button"}
                    form={continueConfig.formId}
                    disabled={!continueConfig.enable}
                >
                    Continue
                    <Icon icon={ICONS.ARROW_RIGHT} />
                </Button>
            }
        </div>
    );
}