import { calculateMonthlyRepayments, getValidFinanceRates } from "@kanda-libs/kanda-utils";
import { NextRequest, NextResponse } from "next/server";

async function getAllFinacneRates () {
    try {
        const url = "https://hub-qa.kanda.co.uk/api/info/rate";

        const response = await fetch (url, { headers: { "x-kanda-api-key": process.env.KANDA_API_KEY ?? "" } });

        if (!response.ok) {
            throw new Error("Failed to get payment options.");
        }

        return await response.json();
    } catch (e) {
        console.error(e);
        throw new Error("[Kanda] Failed to get finance rates.");
    }
}


export async function GET(req: NextRequest) {
    try {
        // TODO: Pass in actual total deposit and work type.
        const params = req.nextUrl.searchParams;
        const total = parseInt(params.get("total") ?? "0");
        const deposit = parseInt(params.get("deposit") ?? "0"); // Default: Resturn 9 entries

        const allRates = await getAllFinacneRates();
        const validRates = getValidFinanceRates(allRates.finance_rates, "air_conditioning", total, deposit);

        const repayment = validRates.map((item) => {
            return {
                rate: item,
                total,
                monthly: calculateMonthlyRepayments(total - deposit, item)
            };
        });

        return NextResponse.json({
            success: true,
            result: repayment
        }, { status: 200 });

    } catch (e) {
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}