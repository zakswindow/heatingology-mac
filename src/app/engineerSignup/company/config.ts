import { CreateCompanyInput } from "@/app/api/engineers/_parser/company";
import { CompanyType } from "@prisma/client";

type TTextInputField = {
    name: Exclude<keyof CreateCompanyInput, "type" | "vatRegistered">;
    label: string;
}

export const COMPANY_TEXT_INPUTS: Record<
    Exclude<keyof CreateCompanyInput, "type" | "vatRegistered">,
    TTextInputField
> = {
    name: {
        label: "Name",
        name: "name"
    },
    gasSafeLicense: {
        label: "Your Gas Safe License Number",
        name: "gasSafeLicense"
    },
    gasSafeNumber: {
        label: "Gas Safe Number",
        name: "gasSafeNumber"
    },
    address: {
        label: "Address",
        name: "address"
    },
    companyNumber: {
        label: "Company Number",
        name: "companyNumber"
    }
};

type TListInputField = {
    label: string;
    name: keyof CreateCompanyInput;
    list: {
        label: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        value: any;
    }[]
}

export const COMPANY_CHECKLIST: Record<
    keyof Pick<CreateCompanyInput, "type" | "vatRegistered">,
    TListInputField
> = {
    type: {
        label: "Company Type",
        name: "type",
        list: [{
            label: "Limted Company",
            value: CompanyType.LIMITED_COMPANY
        }, {
            label: "Sole Trader",
            value: CompanyType.SOLE_TRADER
        }]
    },
    vatRegistered: {
        label: "Vat Registered",
        name: "vatRegistered",
        list: [{
            label: "Yes",
            value: true
        }, {
            label: "No",
            value: false
        }]
    }
};