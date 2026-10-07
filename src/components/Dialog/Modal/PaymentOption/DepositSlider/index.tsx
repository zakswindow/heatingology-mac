"use client";
import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import styles from "./style.module.scss";

function calculateDepositByPercent (percent: number, total: number) {
    return ((percent/100) * total).toFixed(2);
}

type TDepositSlider = {
    total: number;
    onChange: (value: string) => void;
}

export default function DepositSlider ({ total, onChange }: TDepositSlider) {
    const [value, setValue] = useState([0]); // Radix Slider uses array for values
    const deposit = calculateDepositByPercent(value[0], total);

    return (
        <div className={styles.container}>
            <div className={styles.labels}>
                <span className="label-start">Deposit</span>
                <span className="label-value">{`£${deposit} (${value[0]}%)`}</span>
            </div>
      
            <Slider.Root
                className={styles.sliderRoot}
                defaultValue={[50]}
                value={value}
                onValueChange={
                    (values) => {
                        setValue(values);
                        onChange(calculateDepositByPercent(values[0], total));
                    }}
                max={100}
                step={1}
                aria-label="Deposit amount"
            >
                <Slider.Track className={styles.sliderTrack}>
                    <Slider.Range className={styles.sliderRange} />
                </Slider.Track>
                <Slider.Thumb className={styles.sliderThumb} />
            </Slider.Root>

            <div className={styles.footprint}>{`(25% recommended)`}</div>
        </div>
    );
};