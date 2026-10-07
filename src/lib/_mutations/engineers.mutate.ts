import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function createEngineer ({ body } : {
    body: 
    Record<string, unknown>
}) {
    try {
        const response = await fetch(getUrl("/engineers/signup"), {
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

export const useCreateEngineer = () => {
    return useMutation({ mutationFn: createEngineer });
};
