import Button from "@/components/Button";
import NoteCard from "@/components/Card/NoteCard";
import styles from "./style.module.scss";
import RadioInput from "@/components/Input/RadioInput";
import { UseFormRegister } from "react-hook-form";
import { useCallback, useState } from "react";
import { useBookingContext } from "../../_context";
import Tel from "@/components/Anchor/Tel";
import Icon, { ICONS } from "@/components/Image/Icons";
import { useFetchProductByType } from "@/lib/_queries/products.query";
import { Product, ProductType } from "@prisma/client";
import Loading from "@/app/loading";
import Tag from "@/components/Tag";
import classNames from "classnames";

function parseStartHour(model: string): number | null {
    const match = model.match(/(\d{1,2}):(\d{2})/);
    if (!match) return null;
    return parseInt(match[1]);
}

function isSlotExpired(model: string, installDate: Date | null): boolean {
    if (!installDate) return false;
    const now = new Date();
    const isToday = installDate.toDateString() === now.toDateString();
    if (!isToday) return false;
    const startHour = parseStartHour(model);
    if (startHour === null) return false;
    return now.getHours() >= startHour;
}

function parseTimeSlotsToOptions (timeSlots: Product[]) {
    return timeSlots.map((item) => {
        return {
            label: 
            <div className={styles.labelContainer}>
                {item.model}
                {
                    item.price > 0 &&
                        <Tag className={styles.tag}> {`+ £${item.price}`}</Tag>
                }
            </div>,
            value: item.model
        };
    });
}

function getTimeSlotByModel (timeSlots: Product[], model: string) {
    return timeSlots.find(item => item.model === model);
}

type TTimeslotForm = { 
    register: UseFormRegister<any>; 
    canContinue?: boolean;
    onSelect: (slot: Product) => void;
    defaultValue?: string;
    isHidden?: boolean;
}

export default function TimeslotForm ({ 
    register, 
    canContinue = false,
    onSelect,
    defaultValue = "",
    isHidden = true
}: TTimeslotForm) {
    const [selectedSlot, setSelectedSlot] = useState("");
    const { updateExtraPrice, booking } = useBookingContext();
    const { data: timeSlots, isLoading } = useFetchProductByType({ productType: ProductType.install_time });

    const onTimeSelect = useCallback((evt: React.MouseEvent<HTMLInputElement>) => {
        const model = evt.target.value ?? "";
        const slot = getTimeSlotByModel(timeSlots.result, model);

        if (!slot) {
            return;
        }

        onSelect(slot);
        setSelectedSlot(slot.model);
        updateExtraPrice({ time: slot.price });
    }, [updateExtraPrice, timeSlots, onSelect]);

    if (isLoading) {
        return <Loading />;
    }

    if (isHidden) {
        return <p className={styles.selectDate}> Please select a date. </p>
    }

    if (timeSlots?.success && timeSlots.result) {
        const availableSlots = timeSlots.result.filter((slot) => !isSlotExpired(slot.model, booking.installDate));
        const options = parseTimeSlotsToOptions(availableSlots);

        return (
            <section aria-label="Additional Information" className={classNames(styles.calendarForm, {[styles.hidden]: isHidden})}>
                <RadioInput
                    className={styles.selectTime}
                    orientation="vertical"
                    label="Select your time slot:"
                    options={options}
                    name="bookingSlot"
                    register={register}
                    onChange={onTimeSelect}
                    radioMark={<Icon
                        className={styles.icon}
                        icon={ICONS.CHECK_MARK_FILLED}
                    />}
                    optionClassNames={{ selected: styles.selected }}
                    defaultValue={defaultValue}
                />
                <NoteCard className={styles.note} icon={ICONS.DELIVERY_TRUCK}>
                    {`Your installation should take 1-2 days to complete, and our installers will be on site.`}
                </NoteCard>
                <NoteCard icon={ICONS.MOBILE} variant="hightlight" className={styles.noteCall}>
                    {`Call `} <Tel />
                </NoteCard>
                <Button
                    type="submit"
                    className={styles.continue}
                    disabled={!Boolean(selectedSlot || defaultValue) || !canContinue}
                >
                    <span> Continue </span>
                    <Icon icon={ICONS.ARROW_RIGHT} />
                </Button>
               
            </section>
        );
    }
}