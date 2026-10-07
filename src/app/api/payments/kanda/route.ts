import { NextRequest, NextResponse } from "next/server";
import { CreateCheckoutRedirectSchema } from "./_schema";
import { calculateMonthlyRepayments, getValidFinanceRates, WorkType } from "@kanda-libs/kanda-utils";


export async function POST(req: NextRequest) {
    try {
        const KANDA_INFO_CHECKOUT = `${process.env.KANDA_BASE}/api/info/checkout-redirect`;
        const body = await req.json();
        const { success, data: inputData, error } = CreateCheckoutRedirectSchema.safeParse(body);

        if (error) {
            throw new Error(error.message);
        }

        if (!success) {
            throw new Error("Invalid information to proceed.");
        }

        const response = await fetch(KANDA_INFO_CHECKOUT, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "x-kanda-api-key": process.env.KANDA_API_KEY ?? ""
            },
            body: JSON.stringify(inputData)
        });

        if (!response.ok) {
            console.error(response.status);
            throw new Error("Failed to redirect to Kanda.");
        }

        const responseJson = await response.json();

        return NextResponse.json({
            success: true,
            result: responseJson 
        }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 400 });
    }
}

function getWorkType () : WorkType {
    return "boiler_swap";
}

async function getAllFinacneRates () {
    try {
        const url = `${process.env.KANDA_BASE}/api/info/rate`;
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
        const { searchParams } = req.nextUrl;
        const p = searchParams.get("p");
        const price = parseInt(p ?? "0");

        if (!price) {
            return NextResponse.json({
                success: true,
                result: []
            });
        }

        const allRates = await getAllFinacneRates();
        const workType = getWorkType();
        const deposit = 0;
        const validRates = getValidFinanceRates(allRates.finance_rates, workType, price, deposit);
 
        const ratesWithRepayment = validRates.map((rate) => {
            return {
                name: rate.name,
                apr: rate.apr,
                apr_type: rate.apr_type,
                fee: rate.fee,
                duration: rate.duration,
                repayment: calculateMonthlyRepayments(price, rate)
            };
        });

        const sortedRatesAsc = ratesWithRepayment.sort((a, b) => a.repayment - b.repayment);

        return NextResponse.json({
            success: true,
            result: sortedRatesAsc,
            debug: allRates
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 400 });
    }
}