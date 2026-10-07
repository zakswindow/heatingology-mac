"use client";

import SpecsList from "@/components/Texts/SepcsList";
import styles from "./style.module.scss";
import Button from "@/components/Button";
import { CUSTOMISE_PLAN_STATUS } from "../config";
import { useCallback, useState } from "react";
import Image from "@/components/Image";
import { formatPriceNumber } from "@/lib/_calculations";
import classNames from "classnames";
import Tag from "@/components/Tag";

function getActionButtonProps (status: CUSTOMISE_PLAN_STATUS) {

    switch (status) {
        case CUSTOMISE_PLAN_STATUS.ADDED:
            return {
                label: "Remove",
                disabled: false
            };
        case CUSTOMISE_PLAN_STATUS.INCLUDED:
            return {
                label: "Included",
                disabled: true
            };
        default:
            return {
                label: "Add",
                disabled: false
            };
    }
}

export default function CustomiseCard ({ data, onSelect, savePrice, defaultStatus = CUSTOMISE_PLAN_STATUS.PENDING }: { data: any; onSelect: any; savePrice?: number; defaultStatus?: CUSTOMISE_PLAN_STATUS }) {
    const [status, setStatus] = useState<CUSTOMISE_PLAN_STATUS>(defaultStatus);
    const buttonProps = getActionButtonProps(status);

    const onActionButtonClick = useCallback(() => {
        let updatedStatus = status;

        if (status === CUSTOMISE_PLAN_STATUS.PENDING) {
            updatedStatus = CUSTOMISE_PLAN_STATUS.ADDED;
        } else if (status === CUSTOMISE_PLAN_STATUS.ADDED) {
            updatedStatus = CUSTOMISE_PLAN_STATUS.PENDING;
        }
 
        setStatus(updatedStatus);
        onSelect({
            product: data,
            status: updatedStatus
        });
    }, [data, onSelect, status]);


    return (
        <article className={styles.card}>
            <div className={styles.banner}>
                <Image className={styles.imageContainer} type="product" src={data.productImage} alt={data.model} />
            </div>
            <div className={styles.metadata}>
                <h3 className={styles.headline}> { data.model }</h3>
                {
                    data.specs &&
                    <SpecsList className={styles.benefits} specs={data.specs} keyPrefix={data.model} />
                }
                {
                    data.note &&
                    <p className={styles.note}> { data.note }</p>
                }
                <div className={styles.spacer} />
                {
                    data.price &&
                    <div className={styles.priceRow}>
                        <span className={styles.price}>{ `£${formatPriceNumber(data.price)}` }</span>
                        { savePrice && <Tag className={styles.saveTag}>{`Save £${formatPriceNumber(savePrice)}`}</Tag> }
                    </div>
                }
                <Button
                    disabled={buttonProps.disabled}
                    className={classNames(styles.button, { [styles.remove]: status === CUSTOMISE_PLAN_STATUS.ADDED })}
                    onClick={onActionButtonClick}>
                    { buttonProps.label }
                </Button>
            </div>
        </article>
    );
}