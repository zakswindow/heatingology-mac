import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function createQuote ({ body } : {
    body: 
    Record<string, unknown>
}) {
    try {
        const response = await fetch(getUrl("/quote"), {
            method: "POST",
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error('Failed to create screen');
        }

        return await response.json();
    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export const useCreateQuote = () => {
    return useMutation({
        mutationFn: createQuote,
        onSuccess: () => {
        }
    });
};

async function updateQuote ({ id,  body }: { id: string; body: Record<string, unknown> }) {
    try {
        const url = getUrl(`/quote/${id}`);
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Fail to update quote ${id}`);
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

export const useUpdateQuote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateQuote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["getQuoteById"] });
        } 
    });
};

type TSendQuote = {
    email: string;
    name: string;
    quoteId: string;
}

async function sendQuote ({ email, name, quoteId }: TSendQuote) {
    try {
        const response = await fetch(getUrl("/quote/save"), {
            method: "POST",
            body: JSON.stringify({
                to: email,
                name,
                quoteId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create screen');
        }

        return await response.json();
    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export function useSendQuote () {
    return useMutation({ mutationFn: sendQuote });
}