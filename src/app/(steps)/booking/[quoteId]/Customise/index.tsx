import Loading from "@/app/loading";
import styles from "./style.module.scss";
import Icon, { ICONS } from "@/components/Image/Icons";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Button from "@/components/Button";
import { useFetchProductByType } from "@/lib/_queries/products.query";
import { Product, ProductType } from "@prisma/client";
import CustomiseCard from "./Card";
import { useCallback, useEffect, useState } from "react";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import { CUSTOMISE_PLAN_STATUS } from "@/app/(steps)/booking/[quoteId]/Customise/config";
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";
import { useBookingContext } from "@/app/(steps)/booking/[quoteId]/_context";
import { getProductsTotalPrice } from "@/lib/_products";

export default function CustomiseForm ({ quoteId, onContinue, onReadyChange }: { quoteId: string; onContinue: () => void; onReadyChange?: (ready: boolean) => void }) {
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });
    const { data: products, isLoading: isProductsLoading, isError: isProductsError } = useFetchProductByType({ productType: ProductType.boiler_add_ons });
    const [selectedProducts, setSelectedProducts] = useState([]);
    const updateQuote = useUpdateQuote();
    const saving = process.env.NEXT_PUBLIC_CUSTOMISE_SAVING;
    const { isMobile } = useMediaQueries();
    const { updateExtraPrice } = useBookingContext();

    useEffect(() => {
        updateExtraPrice({ addOns: getProductsTotalPrice(selectedProducts) });
    }, [selectedProducts]);

    const onSelect = useCallback(({ product, status }) => {
        if (status === CUSTOMISE_PLAN_STATUS.ADDED) {
            setSelectedProducts((prev) => [...prev, product]);
        } else if (status === CUSTOMISE_PLAN_STATUS.PENDING) {
            setSelectedProducts((prev) => prev.filter((item) => item.id !== product.id));
        }
    }, []);

    useEffect(() => {
        if (quoteResponse && products) {
            const { result: quoteData } = quoteResponse;
            const { result: addOns } = products;
            const alreadyAdded = addOns.filter((addon: Product) =>
                quoteData.products.some((p: Product) => p.id === addon.id)
            );
            setSelectedProducts(alreadyAdded);
            onReadyChange?.(true);
        }
    }, [quoteResponse, products, onReadyChange]);

    const onSkip = useCallback(() => {
        onContinue();
    }, [onContinue]);

    const onNextStep = useCallback(async () => {
        const quoteData = quoteResponse?.result;
        if (!quoteData) return;

        const previousAddOns: Product[] = quoteData.products.filter(
            (p: Product) => p.productType === ProductType.boiler_add_ons
        );
        const selectedIds = new Set(selectedProducts.map((p: Product) => p.id));

        const addActions = selectedProducts
            .filter((item: Product) => !previousAddOns.some((p: Product) => p.id === item.id))
            .map((item: Product) => ({ action: "add", product: item }));

        const removeActions = previousAddOns
            .filter((p: Product) => !selectedIds.has(p.id))
            .map((item: Product) => ({ action: "remove", product: item }));

        const bodyProducts = [...addActions, ...removeActions];

        if (bodyProducts.length > 0) {
            const response = await updateQuote.mutateAsync({
                id: quoteId,
                body: { products: bodyProducts }
            });

            if (response.success) {
                return onContinue();
            } else {
                console.error(response);
            }
        } else {
            onContinue();
        }

    }, [selectedProducts, quoteId, quoteResponse, updateQuote, onContinue]);

    if (isLoading || isProductsLoading) {
        return <Loading />;
    }

    if (isError || isProductsError) {
        throw new Error("Fail to load the quote.");
    }

    if (quoteResponse && products) {
        const { result: quoteData } = quoteResponse;
        const { result: addOns } = products;
        const addedIds = new Set(quoteData.products.map((p: Product) => p.id));

        return (
            <form id="customise-form" className={styles.page} onSubmit={(e) => { e.preventDefault(); onNextStep(); }}>
                <div className={styles.header}>
                    <div>
                        <p className={styles.title}> Choose installation bundle </p>
                        <p className={styles.subTitle}> Upgrade and save </p>
                    </div>
                    <div className={styles.buttons}>
                        <Button className={styles.greyedOut} onClick={onSkip}>
                            Skip
                        </Button>
                        {!isMobile && (
                            <Button type="submit">
                                Continue
                                <Icon icon={ICONS.ARROW_RIGHT} />
                            </Button>
                        )}
                    </div>
                </div>
                <section className={styles.cards}>
                    {
                        addOns.map((item: Product) => {
                            const defaultStatus = addedIds.has(item.id)
                                ? CUSTOMISE_PLAN_STATUS.ADDED
                                : CUSTOMISE_PLAN_STATUS.PENDING;
                            return <CustomiseCard key={item.model} data={item} onSelect={onSelect} savePrice={saving ? parseInt(saving) : 0} defaultStatus={defaultStatus} />;
                        })
                    }
                </section>
            </form>
        );
    }
}