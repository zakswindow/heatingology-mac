import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const params = req.nextUrl.searchParams;
    const term = params.get("term");

    if (!term) {
        return NextResponse.json({
            success: true,
            result: []
        });
    }

    try {
        const url = `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?query=${encodeURIComponent(term)}&api_key=${process.env.IDEALPOSTCODES_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json({
                success: false,
                error: "Failed to fetch address."
            }, {
                status: response.status,
                statusText: response.statusText
            });
        }

        const data = await response.json();

        // Normalise to the shape the frontend expects: [{ id, address }]
        const result = (data?.result?.hits ?? []).map((hit: { id: string; suggestion: string }) => ({
            id: hit.id,
            address: hit.suggestion
        }));

        return NextResponse.json({
            success: true,
            result
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}
