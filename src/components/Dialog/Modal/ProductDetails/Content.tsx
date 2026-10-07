"use client";
import ImageCarousel from "./ImageCarousel";
import PriceBox from "@/components/Card/PriceBox";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import InfoTabs from "./InfoTabs";
import { useMediaQueries } from "@/lib/_contexts/_mediaQuery";
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon, { ICONS } from "@/components/Image/Icons";
import { Product, ProductType, Quote } from "@prisma/client";
import RequestSurveyDialog from "@/components/Dialog/Modal/RequestSurvey";
import { getUrl } from "@/lib/_api";
import { useGetKandaRatesByPrice } from "@/lib/_queries/kanda.query";
import { featuresFlag } from "@/lib/_features";

type TProductDialogContent = {
    product: Product;
    quoteData: Quote;
    selectedCable?: Product | null;
    totalPrice?: number;
}

export default function ProductDialogContent ({ product, quoteData, selectedCable, totalPrice }: TProductDialogContent) {
    const { isLoading, isMobile } = useMediaQueries();
    const updateQuote = useUpdateQuote();
    const router = useRouter();
    const [isCallbackOpen, setIsCallbackOpen] = useState(false);
    const [showMobileBar, setShowMobileBar] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const price = totalPrice || product.priceWithVat || product.price;

    const supportsRepayments = [ProductType.boiler, ProductType.heatPump, ProductType.ev_charger].includes(product.productType);
    const { data: rateData } = useGetKandaRatesByPrice({
        price,
        enabled: featuresFlag.kanda && supportsRepayments
    });
    const [paymentOptions, setPaymentOptions] = useState<any[]>([]);

    useEffect(() => {
        if (rateData) {
            const { result = [] } = rateData;
            if (result.length > 0) {
                setPaymentOptions(result);
            }
        }
    }, [rateData]);

    useEffect(() => {
        if (!isMobile || !sentinelRef.current || !scrollAreaRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setShowMobileBar(true);
            },
            { root: scrollAreaRef.current, threshold: 0 }
        );

        observer.observe(sentinelRef.current);
        return () => observer.disconnect();
    }, [isMobile]);

    const onBooking = useCallback(async () => {
        const quoteResponse = await fetch(getUrl(`/quote/${quoteData.id}`));
        const quoteResult = await quoteResponse.json();
        const existingProducts: Product[] = quoteResult.result?.products || [];

        const products = [
            ...existingProducts.map((p) => ({ action: "remove", product: p })),
            { action: "add", product },
            ...(selectedCable ? [{ action: "add", product: selectedCable }] : [])
        ];

        const { success } = await updateQuote.mutateAsync({
            id: quoteData.id,
            body: {
                price,
                products
            }
        });

        if (success) {
            router.push(`/booking/${quoteData.id}`);
        }
    }, [product, selectedCable, price, quoteData, updateQuote]);

    if (isLoading) {
        return <h1> Loading...</h1>;
    }

    return (
        <main className={styles.content}>
            <div ref={scrollAreaRef} className={styles.scrollArea}>
                {isMobile && <h2 className={styles.productName}>{product.model}</h2>}
                <div className={styles.snapshots}>
                    {
                        product.productImages && product.productImages.length > 0 ?
                            <ImageCarousel
                                isMobile={isMobile}
                                images={product.productImages || []}
                            />
                        : <ImageCarousel
                            isMobile={isMobile}
                            images={[product.productImage]}
                            />
                    }
                </div>
                <div className={styles.details}>
                    {!isMobile && <h2 className={styles.productName}>{product.model}</h2>}
                    <PriceBox
                        product={product}
                        price={price} />
                    <div className={styles.buttons}>
                        <Button
                            className={styles.button}
                            onClick={async () => await onBooking()}
                        >
                            Book an appointment
                            <Icon icon={ICONS.ARROW_RIGHT} />
                        </Button>
                        <Button variant="outline" className={styles.button} onClick={() => setIsCallbackOpen(true)}>
                            <Icon icon={ICONS.HELP} />
                            Request a call
                        </Button>
                        <RequestSurveyDialog
                            contactOnly
                            rootProps={{ open: isCallbackOpen, onOpenChange: setIsCallbackOpen }}
                        />
                    </div>

                    <InfoTabs product={product} isMobile={isMobile} price={price} onBooking={onBooking} />
                    {/* {isMobile && <div ref={sentinelRef} />}
                    {isMobile && showMobileBar && (
                        <div className={styles.mobileBottomBar}>
                            <div className={styles.mobilePrice}>
                                <span className={styles.mobilePriceTotal}>£{formatPriceNumber(price)}</span>
                            </div>
                            <Button
                                className={styles.mobileContinueBtn}
                                onClick={async () => await onBooking()}
                            >
                                Continue
                                <Icon icon={ICONS.ARROW_RIGHT} />
                            </Button>
                        </div>
                    )} */}
                </div>
            </div>
        </main>
    );
}
