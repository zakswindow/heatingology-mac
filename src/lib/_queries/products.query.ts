import { ProductType } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../_api";


type TFetchProductByType = {
    productType: ProductType | undefined;
    limit?: number;
    sort?: string; // field to sort
    order?: 'asc' | 'desc';
    models?: string;
}

async function fetchProductsByType ({ productType, limit = 0, models }: TFetchProductByType) {
    try {
        const url = getUrl(`/products/${productType}?limit=${limit}&${models}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch products.");
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

export function useFetchProductByType(queryParams: TFetchProductByType) {
    const { productType, ...others } = queryParams;
    
    return useQuery({
        queryKey: ["fetchProductsByType", productType, others],
        queryFn: async () => fetchProductsByType(queryParams),
        enabled: Boolean(productType)
    });
}

async function fetchProductById ({ id }) {
    try {
        const url = getUrl(`/product?id=${id}`);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch products.");
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

export function useFetchProductById(queryParams: { id: string }) {
    const { id } = queryParams;

    return useQuery({
        queryKey: ["fetchProductById", id],
        queryFn: async () => fetchProductById(queryParams),
        enabled: Boolean(id)
    });
}