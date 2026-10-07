import { useMutation } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function createKandaRedirect (data) {
    try {
        const url = getUrl("/payments/kanda");

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data.body)
        });

        if (!response.ok) {
            throw new Error("Failed to redirect.");
        }

        return await response.json();
    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export function useCreateRedirect () {
    return useMutation({
        mutationFn: createKandaRedirect,
        onSuccess: (response) => {
            if (!response.success || !response.result) {
                throw new Error("Failed to redirect: No redirect instruction.");
            }

            const { result } = response;
            const { redirect_urls } = result;
            const { checkout_url } = redirect_urls;

            if (!checkout_url) {
                throw new Error("Failed to fetch the redirection URL.");
            }

            window.open(checkout_url);
        }
    });
}

async function emailInvoice ({ to, quoteId }) {
    try {
        const url = getUrl("/payments/invoice");
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                to,
                quoteId
            })
        });

        if (!response.ok) {
            throw new Error("Failed to send email.");
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

export function useEmailInvoice () {
    return useMutation({
        mutationFn: emailInvoice,
        retry: false
    });
}

async function emailCompany ({ to, quoteId }: { to: string; quoteId: string }) {
    try {
        const url = getUrl("/quote/confirm");
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({ to, quoteId })
        });

        if (!response.ok) {
            throw new Error("Failed to send confirmation emails.");
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

export function useEmailCompany () {
    return useMutation({
        mutationFn: emailCompany,
        retry: false
    });
}