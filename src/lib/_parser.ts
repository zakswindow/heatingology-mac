
export function groupData (data: any, key) {
    const groupedData = data.reduce((result, item) => {
        const group = item[key];

        if (!group) {
            return result;
        }
       
        if (!result[group]) {
            result[group] = [];
        }
        result[group].push(item);
        return result;
    }, {});

    if (Object.keys(groupedData).length > 0) {
        return {
            groups: Object.keys(groupedData).map((key) => {
                return {
                    title: key,
                    data: groupedData[key]
                };
            })
        };
    }

    // No grouped data, return data itself.
    return data;
}

export function jsonParse(data: string) {
    try {
        return JSON.parse(data);
    } catch (e) {
        console.error(e);
        return {};
    }
}
