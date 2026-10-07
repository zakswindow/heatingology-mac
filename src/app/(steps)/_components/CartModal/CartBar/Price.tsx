import { useBookingContext } from "@/app/(steps)/booking/[quoteId]/_context";
import { getProductsTotalPrice } from "@/lib/_products";
import { useGetQuoteById } from "@/lib/_queries/screens.query";

export default function CartPrice ({ quoteId }) {
    const { data: quoteResponse, isLoading, isError } = useGetQuoteById({ id: quoteId });
    const { booking } = useBookingContext();

    if (isLoading || isError) {
        return null;
    }

    if (quoteResponse) {
        const { result: quoteData } = quoteResponse;
        const { products = [] } = quoteData;
        const extraPrice = Object.values(booking.extraPrice).reduce((acc, item) => acc + item, 0);

        const price = getProductsTotalPrice(products) + extraPrice;
        return (
            <div>{`£${price}`}</div>
        );

    }

}