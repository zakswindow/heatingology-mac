"use client";
import BookingClient from "./client";
import { useParams, useSearchParams } from "next/navigation";
import { useGetQuoteById } from "@/lib/_queries/screens.query";
import Loading from "@/app/loading";

export default function BookingPage () {
    const params = useParams();
    const searchParams = useSearchParams();
    const { quoteId } = params;
    const initialStep = searchParams.get('step') ?? undefined;
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });

    if (isLoading) {
        return <Loading />;
    }

    if (isError) {
        throw new Error("Failed to book.");
    }

    if (quoteResponse) {
        const { result: quoteData } = quoteResponse;
        const quoteContent = JSON.parse(quoteData.content);
        return <BookingClient
            quoteData={{
                ...quoteData,
                content: quoteContent
            }}
            initialStep={initialStep}
        />;
    }
}