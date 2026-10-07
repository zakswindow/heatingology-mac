import { CreateDocumentsData } from "@/app/api/engineers/_parser/document";

type TDocumentFile = {
    label: string;
    description?: string;
    footprint?: string;
    name: keyof CreateDocumentsData;
}

type TDocumentsDate = {
    label: string;
    name: string;
}

export const DOCUMENTS: Record<
    string,
    {
        label: string;
        files: TDocumentFile[],
        date: TDocumentsDate
    }
> = {
    GAS_SAFE_CARD: {
        label: "Gas Safe Card",
        files: [{
            label: "Upload a photo of the front of your card.",
            description: "You can upload 1 photo only. (Max 5MB)",
            footprint: `Only support .jpg, .png and .svg files`,
            name: "gasSafeCardFront" 
        }, {
            label: "Upload a photo of the rear of your card",
            description: "You can upload 1 photo only. (Max 5MB)",
            footprint: `Only support .jpg, .png and .svg files`,
            name: "gasSafeCardRear" 
        }],
        date: {
            label: "Card expiry date",
            name: "gasSafeCardExpiryDate" 
        }
    },
    CCN1_ACS: {
        label: "CCN1 (ACS)",
        files: [{
            label: "CCN1 (ACS) document",
            name: "ccn" 
        }],
        date: {
            label: "CCN1 (ACS) expiry date",
            name: "ccnExpiryDate" 
        }
    },
    INSURANCE: {
        label: "Insurance",
        files: [{
            label: "Public Liability Insurance",
            name: "insurance" 
        }],
        date: {
            label: "PL expiry date",
            name: "insuranceExpiryDate" 
        }
    },
    FLUE_GAS_ANALYSER: {
        label: "Flue Gas Analyser Certificate",
        files: [{
            label: "FGA Calibration",
            name: "fga" 
        }],
        date: {
            label: "FGA certificate expiry date",
            name: "fgaExpiryDate" 
        }
    },
    DBS: {
        label: "DBS Certificate",
        files: [{
            label: "DBS Certificate",
            name: "dbs" 
        }],
        date: {
            label: "DBS certificate issue date",
            name: "dbsIssueDate" 
        }
    }
};