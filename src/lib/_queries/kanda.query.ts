import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function getKandaRatesByPrice({ price }) {
    try {
        const url = getUrl(`/payments/kanda?p=${price}`);
        const response = await fetch(url, { method: "GET" });
        
        if (!response.ok) {
            throw new Error("Failed to get Kanda rates.");
        }
        return await response.json();

    } catch (e) {
        console.error(e);
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export function useGetKandaRatesByPrice ({ price, enabled }) {
    return useQuery({
        queryKey: ["getKandaRatesByPrice", price],
        queryFn: async () => getKandaRatesByPrice({ price }),
        enabled: Boolean(price > 0) && enabled
    });
}