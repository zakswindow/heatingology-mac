export function getUrl (api: string) {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}${api}`;
} 