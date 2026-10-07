import { getUrl } from "@/lib/_api";
import ConfirmPage from "./Confirm";
import CancelledPage from "./Cancelled";

export default async function CheckoutStatusPage ({ searchParams, params }) {
    const { quoteId } = await params;
    const resolvedParams = await searchParams;
    const payment = resolvedParams['payment'];

    if (payment === 'paypal') {
        const status = resolvedParams['status'];
        if (status === 'complete') {
            return <ConfirmPage quoteId={quoteId} />;
        }
        return <CancelledPage quoteId={quoteId} />;
    }
    try {
        const sessionId = resolvedParams['session_id'];
        const url = getUrl(`/payments/status?session_id=${sessionId}`);
        const session = await fetch(url);
        const sessionJson = await session.json();
        const { status } = sessionJson;

        if (status === 'complete') {
            return <ConfirmPage quoteId={quoteId} />;
        }

        return <CancelledPage quoteId={quoteId} />;
    } catch (e) {
        return <CancelledPage quoteId={quoteId} />;
    }
}