"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

type Props = { planKey: string; priceNum: number };

export default function PurchaseTracker({ planKey, priceNum }: Props) {
    useEffect(() => {
        trackEvent('purchase', { plan: planKey, value: priceNum, currency: 'GBP' });
    }, [planKey, priceNum]);
    return null;
}
