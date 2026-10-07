import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const id = params.get("id");
        const url = `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses/${id}/gbr?api_key=${process.env.IDEALPOSTCODES_API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json({
                success: false,
                error: "Failed to fetch full address."
            }, {
                status: response.status,
                statusText: response.statusText
            });
        }

        const data = await response.json();
        const addr = data?.result ?? {};

        // Normalise to the shape the frontend expects (matching former getAddress.io field names)
        const result = {
            line_1: addr.line_1 ?? "",
            line_2: addr.line_2 ?? "",
            town_or_city: addr.post_town ?? "",
            county: addr.county ?? "",
            postcode: addr.postcode ?? ""
        };

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
