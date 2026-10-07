"use client";
import { useEffect } from "react";

export default function EvChargerBodyClass() {
    useEffect(() => {
        document.body.classList.add("ev-charger-page");
        return () => document.body.classList.remove("ev-charger-page");
    }, []);
    return null;
}
