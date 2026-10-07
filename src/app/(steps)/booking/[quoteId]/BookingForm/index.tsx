"use client";
import BookingCalendar from "./BookingCalendar";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import styles from './style.module.scss';
import { useUpdateQuote } from "@/lib/_mutations/quote.mutate";
import TimeslotForm from "./TimeslotForm";
import { BookingSlotInput, BookingSlotSchema } from "./_schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product, ProductType } from "@prisma/client";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import { filterProductsByProductType, hasProduct } from "@/lib/_products";
import Loading from "@/app/loading";
import { useBookingContext } from "../_context";
import Button from "@/components/Button";
import Icon, { ICONS } from "@/components/Image/Icons";

type TBookingForm = {
    onContinue: () => void;
    quoteId: string;
    onReadyChange?: (ready: boolean) => void;
}

export default function BookingForm ({ onContinue, quoteId, onReadyChange }: TBookingForm) {
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const { updateBooking } = useBookingContext();

    const updateQuote = useUpdateQuote();
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });
    
    const [selectedDay, setSelectedDay] = useState<Date | null>();
    const [selectedTime, setSelectedTime ] = useState<Product | null>(null);

    useEffect(() => {
        if (quoteResponse) {
            const { result: quotedata } = quoteResponse;
            const slot = filterProductsByProductType({
                products: quotedata.products,
                productType: ProductType.install_time
            });

            if (!selectedTime && slot.length === 1) {
                setSelectedTime(slot[0]);
            }

            if (!selectedDay && quotedata.installDate) {
                setSelectedDay(new Date(quotedata.installDate));
            }
        }
    }, [quoteResponse, selectedDay, selectedTime]);

    const onDaySelect = useCallback((value: Date) => {
        setSelectedDay(value);
    }, []);

    const onTimeSelect = useCallback((slot: Product) => {
        setSelectedTime(slot);
        updateBooking({ installTime: slot.model });
    }, [updateBooking]);

    useEffect(() => {
        onReadyChange?.(Boolean(selectedDay && selectedTime));
    }, [selectedDay, selectedTime, onReadyChange]);

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Failed to load the quote.");
    }

    if (quoteResponse) {
        const { result: quoteData } = quoteResponse;
        const onSubmit = async () => {
            if (!selectedDay && !selectedTime) {
                // No changes.
                return onContinue();
            }

            const body = {};

            if (selectedDay) {
                body.installDate = selectedDay;
            }

            if (selectedTime) {
                const hasInstallTime = hasProduct({
                    match: (item) => {
                        return item.productType === ProductType.install_time;
                    },
                    products: quoteData.products
                });

                const products = [{
                    action: "add",
                    product: selectedTime
                }];

                if (hasInstallTime) {
                    products.push({
                        action: "remove",
                        product: hasInstallTime
                    });
                }
                body.installTime = selectedTime.model;
                body.extraPrice = selectedTime.price;
                body.products = products;
            }
    
            const { success } = await updateQuote.mutateAsync({
                id: quoteData.id,
                body
            });
    
            if (success) {
                onContinue();
            }
        };

        return (
            <section className={styles.container}>
                <form id="booking-form" className={styles.calendar} onSubmit={handleSubmit(onSubmit)}>
                    <BookingCalendar
                        onSelect={(onDaySelect)}
                        defaultValue={selectedDay}
                    />
                    <TimeslotForm
                        isHidden={Boolean(!selectedDay)}
                        register={register}
                        canContinue={Boolean(selectedDay)}
                        onSelect={onTimeSelect}
                        defaultValue={selectedTime?.model ?? ""}
                    />
                </form>
            </section>
        );
    }
}