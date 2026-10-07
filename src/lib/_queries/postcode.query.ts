import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../_api";

export async function validatePostcode (postcode: string) {
    try {
        const url = `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.replace(/\s/g, ''))}/validate`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to validate postcode.");
        }
        const { result } = await response.json();
        return {
            success: true,
            result
        };
    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

async function getAddressByPostcode (postcode: string) {
    try {
        const url = getUrl(`/postcode/search?term=${postcode}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(e);
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

async function getAddressById (id: string) {
    try {
        const url = getUrl(`/postcode/autocomplete?id=${id}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(e);
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

export function useGetAddressByPostcode ({ postcode }: { postcode: string }) {
    return useQuery({
        queryKey: ["getAddressByPostcode", postcode],
        queryFn: async () => getAddressByPostcode(postcode),
        enabled: Boolean(postcode && postcode.length >= 3)
    });
}

export function useGetAddressById ({ id }: { id: string }) {
    return useQuery({
        queryKey: ["getAddressById", id],
        queryFn: async () => getAddressById(id),
        enabled: Boolean(id)
    });
}