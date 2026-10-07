'use client';

import { useCallback, useEffect, useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from './style.module.scss';
import classNames from "classnames";
import { useGetUKHolidays } from "@/lib/_queries/misc.query";
import Loading from "@/app/loading";
import { useBookingContext } from "../../_context";

const today = new Date();

function getExtraPrice (date: Date) {
    // TODO: Get the price from database?
    return 0;
    const day = date.getDay();

    if (day === 0 || day === 6) {
        // Saturday or Sunday
        return 59;
    }
    return 0;
}

function getIsHoliday (date: Date, holidays) {
    return holidays.indexOf(date.setHours(0, 0, 0, 0)) >= 0;
}

function getIsToday (date: Date) {
    return today.getMonth() === date.getMonth() && today.getDate() === date.getDate();
}

type TBookingCalendar = {
    onSelect: (value: Date) => void;
    defaultValue?: Date;
}
export default function BookingCalendar({ onSelect, defaultValue }: TBookingCalendar) {
    const [selected, setSelected] = useState<Date | undefined>(defaultValue);
    const { updateBooking, updateExtraPrice } = useBookingContext();
    const { data: holidays } = useGetUKHolidays();

    const disabledDates: Date[] = [];

    useEffect(() => {
        if (defaultValue && !selected) {
            setSelected(defaultValue);
        }
    }, [defaultValue, selected]);

    const onDaySelect = useCallback((value: Date) => {
        setSelected(value);
        onSelect(value);
        updateBooking({ installDate: value });
        updateExtraPrice({ date: getExtraPrice(value) });
    }, [onSelect, updateBooking, updateExtraPrice]);

    const Day = useMemo(() => function Day ({ children, modifiers, ...props }) {
        const extraPrice = getExtraPrice(props.day.date);
        const isHoliday = getIsHoliday(props.day.date, holidays);
        const isToday = getIsToday(props.day.date);

        return <td
            className={
                classNames(styles.calendarDay, {
                    [styles.selected]: modifiers.selected,
                    [styles.holiday]: isHoliday
                })
            }>
            {children}
            {
                extraPrice > 0 && !modifiers.disabled &&
                    <span className={styles.priceTag}> { `+£${extraPrice}` }</span>
            }
            {
                isToday &&
                    <span className={styles.today} />
            }
        </td>;
    }, [holidays]);

    if (!holidays) {
        return <Loading />;
    }


    return (
        <DayPicker
            className={styles.calendarWrapper}
            animate
            mode="single"
            selected={selected}
            onSelect={onDaySelect}
            required
            disabled={[{ before: new Date() }, ...disabledDates]}
            components={{ Day }}
        />
    );
}