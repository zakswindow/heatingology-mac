import { calculateMonthlyRepayments, getValidFinanceRates, ValidFinanceRate, WorkType } from "@kanda-libs/kanda-utils";

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

// Sorted Kanda Rates: repayment in ASC order
export async function getKandaRates(products) {
    try {
        const allRates = await getAllFinacneRates();
        const workType = "ev_charger";
        const deposit = 0;
        const rates: Record<string, ValidFinanceRate[]> = {};

        products.forEach((product) => {
            const productRates = getValidFinanceRates(allRates.finance_rates, workType, product.priceWithVat, deposit);
            const ratesWithRepayment = productRates.map((rate) => {
                return {
                    ...rate,
                    repayment: calculateMonthlyRepayments(product.priceWithVat, rate)
                };
            });
            const sortedRatesAsc = [...ratesWithRepayment].sort((a, b) => a.repayment - b.repayment);
            rates[product.id] = sortedRatesAsc;
        });

        return rates;
    } catch (e) {
        console.error(e);
    }
}