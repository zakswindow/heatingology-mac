"use client";
import styles from "./style.module.scss";
import CartSection from "./Section";
import { useBookingContext } from "../../booking/[quoteId]/_context";
import { CART_DETAILS, PRODUCT_CART_DETAILS } from "./config";
import { ProductType } from "@prisma/client";
import { useEffect } from "react";
import NoteCard from "@/components/Card/NoteCard";
import classNames from "classnames";
import { ICONS } from "@/components/Image/Icons";
import { format } from "date-fns";
import { STEPS } from "../Header/config";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";
import { filterProductsByProductType, getProductsTotalPrice } from "@/lib/_products";
import WhatsIncludedDialog from "@/components/Dialog/SideSheets/WhatsIncluded";

type TCart = {
    className?: string;
    quoteId: string;
    curStep: any;
    onChange: { onChangeInstallDate: () => void; onChangePackage: () => void; }
}

function getDateHeadline (productType: ProductType) {
    switch (productType) {
        case ProductType.boiler_service:
        case ProductType.boiler_repair:
            return "Visit date";
        default:
            return "Install date";
    }
}

export default function Cart ({ className, quoteId, curStep, onChange }: TCart) {
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });
    const { booking } = useBookingContext();

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Failed to load the cart.");
    }

    if (quoteResponse) {
        const { result: quoteData } = quoteResponse;
        const { products = [], productType } = quoteData;
        const cartDetailsSections = PRODUCT_CART_DETAILS[quoteData.productType as ProductType];
        const mainProducts = filterProductsByProductType({
            products,
            productType: quoteData.productType
        });
        const extraProducts = filterProductsByProductType({
            products,
            productType: [ProductType.boiler_extra, ProductType.boiler_add_ons, ProductType.ev_cable]
        });

        const hasContextExtraPrice = Object.keys(booking.extraPrice).length > 0;
        const contextExtraPrice = Object.values(booking.extraPrice).reduce((acc, item) => acc + item, 0);
        const timeSlotProducts = filterProductsByProductType({ products, productType: ProductType.install_time });
        const savedTimeSlotPrice = getProductsTotalPrice(timeSlotProducts);
        const extraPrice = hasContextExtraPrice ? contextExtraPrice : savedTimeSlotPrice;
        const installDate = booking.installDate || quoteData.installDate;
        const installTime = booking.installTime || quoteData.installTime;
        const price = getProductsTotalPrice(mainProducts) + getProductsTotalPrice(extraProducts) + extraPrice;

        return (
            <section aria-label="booking details" className={classNames(styles.details, className)}>
                {
                    cartDetailsSections[CART_DETAILS.PRICE] && price > 0 &&
                    <CartSection
                        data={{
                            type: "price",
                            content: [{
                                price,
                                products: mainProducts,
                                notes: [{ content: "Installed from Mon, 16th Jun" }]
                            }]
                        }} />
                }
                {
                    mainProducts.length > 0 &&
                    <CartSection
                        data={{
                            type: "product",
                            headline: "Your package",
                            content: mainProducts
                        }}
                        onChangeClick={onChange.onChangePackage}
                    />
                }
                {
                    cartDetailsSections[CART_DETAILS.INSTALL_DATE] && installDate &&
                    <CartSection
                        data={{
                            type: "date",
                            headline: getDateHeadline(productType),
                            noChange: curStep.title === STEPS.BOOKING.title,
                            content  : [{
                                date: new Date(installDate),
                                time: installTime 
                            }]
                        }}
                        onChangeClick={onChange.onChangeInstallDate}
                    />
                }

                {
                    cartDetailsSections[CART_DETAILS.INSTALLATION] && extraProducts.length > 0 &&
                        <CartSection
                            data={{
                                type: "product",
                                headline: "Your installation",
                                content: extraProducts,
                                noChange: true
                            }}

                        />
                }

                <WhatsIncludedDialog productType={quoteData.productType} />
            </section>
        );
    }
}