import { CustomerTitle } from "@prisma/client";

type TTextInputField = {
    name: string;
    label: string;
}

export const USER_TEXT_INPUTS: Record<
    string,
    TTextInputField
> = {
    firstName: {
        label: 'First name',
        name: 'firstName'
    },
    lastName: {
        label: 'Last name',
        name: 'lastName'
    },
    contactNumber: {
        label: 'Contact number',
        name: 'contactNumber'
    },
    email: {
        label: 'Emali address',
        name: 'email'
    },
    note: {
        label: "Note",
        name: "note"
    }
};

export const USER_SELECTION_INPUTS: Record<
    string,
    {
        name: string;
        label: string;
        options: {
            value: CustomerTitle,
            label: CustomerTitle
        }[]
    }
> = {
    title: {
        label: 'Title',
        name: 'title',
        options: [
            {
                value: CustomerTitle.MR,
                label: CustomerTitle.MR 
            },
            {
                value: CustomerTitle.MRS,
                label: CustomerTitle.MRS 
            },
            {
                value: CustomerTitle.MS,
                label: CustomerTitle.MS 
            },
            {
                value: CustomerTitle.MISS,
                label: CustomerTitle.MISS
            }
        ]
    } 
};