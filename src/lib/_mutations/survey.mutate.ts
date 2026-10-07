import { useMutation } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function createSurvey ({ body }) {
    try {
        const url = getUrl("/survey");
        const response = await fetch(url, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error("Failed to create survey.");
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

export function useCreateSurvey () {
    return useMutation({ mutationFn: createSurvey });
}