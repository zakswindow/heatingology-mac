export enum LOCATION_AREA {
    EAST_ANGLIA = "East Anglia",
    LONDON = "London",
    MIDLANDS = "Midlands",
    NORTH_EAST = "North East",
    NORTH_WEST = "North West",
    SOUTH_CENTRAL = "South Central",
    SOUTH_EAST = "South East",
    SOUTH_WEST = "South West"
}

function parseAreaCodes (codes: string[]): { label: string; value: string; }[] {
    return codes.map((item) => {
        return {
            label: item.toUpperCase(),
            value: item.toLowerCase()
        };
    });
}

export const LOCATION_CODES = [{
    label: "East Anglia",
    value: LOCATION_AREA.EAST_ANGLIA,
    options: parseAreaCodes(["LU", "MK", "PE", "CB", "IG", "SS", "Co", "Cm", "Rm", "Al", "WD", "SG", "En", "RB", "IP"])
}, {
    label: "London",
    value: LOCATION_AREA.LONDON,
    options: parseAreaCodes(["EC", "E", "N", "NW", "SE", "SW", "WC", "W"])
}, {
    label: "Midlands",
    value: LOCATION_AREA.MIDLANDS,
    options: parseAreaCodes(["DE", "LE", "NN", "NG", "ST", "WS", "WV", "DY", "CV", "B"])
}, {
    label: "North East",
    value: LOCATION_AREA.NORTH_EAST,
    options: parseAreaCodes(["TS", "DH", "LN", "HU", "DL", "YO", "HG", "S", "DN", "NE", "DR", "WG", "HX", "BD", "HD"])
}, {
    label: "North West",
    value: LOCATION_AREA.NORTH_WEST,
    options: parseAreaCodes([
        "WA", "SK", "CH", "CW", "CA", "FY", "BL", "OL",
        "M", "PR", "WN", "BB", "LA", "L", "SY", "TF"
    ])
}, {
    label: "South Central",
    value: LOCATION_AREA.SOUTH_CENTRAL,
    options: parseAreaCodes([
        "RG", "SL", "SO", "PO", "HP", "UB", "HA", "OX", "GU", "SN", "SP"
    ])
}, {
    label: "South East",
    value: LOCATION_AREA.SOUTH_EAST,
    options: parseAreaCodes([
        "BN", "CT", "BR", "TN", "DA", "ME", "TW", "SM", "KT", "CR", "RH"
    ])
}, {
    label: "South West",
    value: LOCATION_AREA.SOUTH_WEST,
    options: parseAreaCodes([
        "BA", "BS", "TR", "EX", "PL", "TQ", "DT", "BH", "GL", "HR", "TA", "WR"
    ])
}
];