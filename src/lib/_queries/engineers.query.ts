import { useQuery } from "@tanstack/react-query";
import { getUrl } from "../_api";

async function getQualifications () {
    try {
        const url = getUrl("/engineers/qualifications");
        const response = await fetch(url, { method: "GET" });
        
        if (!response.ok) {
            throw new Error("FAiled to get qualifications.");
        }
        return await response.json();
    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
}

export function useGetQualifications () {
    return useQuery({
        queryKey: ["getQualifications"],
        queryFn: async () => getQualifications()
    });
}