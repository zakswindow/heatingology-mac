import { useQuery } from "@tanstack/react-query";

function filterHolidays (holidays) {
    const today = new Date();

    return holidays.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        holidayDate.setHours(0, 0, 0, 0);
        return holidayDate >= today;
    }).map((holiday) => {
        const holidayDate = new Date(holiday.date);
        return holidayDate.setHours(0, 0, 0, 0);
    });
}

async function fetchUKHolidays () {
    try {
        const url = "https://www.gov.uk/bank-holidays.json";
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch UK Holidays.");
        }

        const json = await response.json();
        return filterHolidays(json["england-and-wales"].events);
    }catch (e) {
        console.error(e);
    }
}

export function useGetUKHolidays () {
    try {
        return useQuery({
            queryKey: ["fetchUKHolidays"],
            queryFn: async () => fetchUKHolidays()
        });
    } catch (e) {
        console.error(e);
    }
}