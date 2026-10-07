import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function getQuoteById ({ id }: { id: string }) {
    try {
        const url = getUrl(`/quote/${id}`);
        const response = await fetch(url, { method: 'GET' });

        if (!response.ok) {
            throw new Error("Failed to get screen");
        }
        return await response.json();

    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export function useGetQuoteById ({ id }) {
    return useQuery({
        queryKey: ["getQuoteById", id],
        queryFn: async () => getQuoteById({ id }),
        enabled: Boolean(id) 
    });
}