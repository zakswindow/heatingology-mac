
type TGetPaginatedData = {
    data: unknown[],
    page: number;
    countPerPage: number;
}
export function getPaginatedData ({ data, page, countPerPage }: TGetPaginatedData) {
    if (page > 0) {
        const start = (page - 1) * countPerPage;
        return data.slice(start, start + countPerPage);
    }
    return data.slice(0, countPerPage);
        

}