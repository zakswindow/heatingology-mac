import { CustomerTitle } from "@prisma/client";
import { CreateContactInput } from "./_schema";

export const USER_SELECTION_INPUTS: Record<
    string,
    {
        name: Partial<keyof CreateContactInput>;
        label: string;
        options: {label: string; value: CustomerTitle }[]
    }
> = {
    title: {
        label: "Title *",
        name: "title",
        options: [{
            label: "Mr",
            value: CustomerTitle.MR 
        } , {
            label: "Miss",
            value: CustomerTitle.MISS
        }, {
            label: "Ms",
            value: CustomerTitle.MS
        }, {
            label: "Mrs",
            value: CustomerTitle.MRS
        }] 
    } 
};

type TTextInputField = {
    name: Partial<keyof CreateContactInput>;
    label: string;
    placeholder: string;
}

export const LANDLORD_ADDRESS_INPUTS = {
    postcode: {
        label: "Postcode *",
        name: "landlordPostcode",
        placeholder: "e.g. W12 0CG"
    },
    addressLine1: {
        label: "Address Line 1 *",
        name: "landlordAddressLine1",
        placeholder: "Address Line 1"
    },
    addressLine2: {
        label: "Address Line 2",
        name: "landlordAddressLine2",
        placeholder: "Address Line 2"
    },
    addressCity: {
        label: "Town/City *",
        name: "landlordAddressCity",
        placeholder: "Town/City"
    },
    addressCounty: {
        label: "County",
        name: "landlordAddressCounty",
        placeholder: "County"
    }
}

export const USER_TEXT_INPUTS: Record<
    keyof CreateContactInput,
    TTextInputField
> = {
    firstName: {
        label: "First Name",
        placeholder: "Enter your first name",
        name: "firstName"
    },
    lastName: {
        label: "Last Name",
        name: "lastName",
        placeholder: "Enter your last name"
    },
    contactNumber: {
        label: "Contact Number",
        name: "contactNumber",
        placeholder: "e.g. 01234567890"
    },
    email: {
        label: "Email address",
        name: "email",
        placeholder: "e.g. heating0123@gmail.com"
    },
    postcode: {
        label: "Postcode *",
        name: "postcode",
        placeholder: "e.g. W12 0CG"
    },
    addressLine1: {
        label: "Address Line 1 *",
        name: "addressLine1",
        placeholder: "Address Line 1"
    },
    addressLine2: {
        label: "Address Line 2",
        name: "addressLine2",
        placeholder: "Address Line 2"
    },
    addressCity: {
        label: "Town/City *",
        name: "addressCity",
        placeholder: "Town/City"
    },
    addressCounty: {
        label: "County",
        name: "addressCounty",
        placeholder: "County"
    },
    note: {
        label: "Note",
        name: "note",
        placeholder: "Anything you would like to share..."
    },
    landlordPostcode: {
        label: "Postcode *",
        name: "postcode",
        placeholder: "e.g. W12 0CG"
    },
    landlordAddressLine1: {
        label: "Address Line 1 *",
        name: "addressLine1",
        placeholder: "Address Line 1"
    },
    landlordAddressLine2: {
        label: "Address Line 2",
        name: "addressLine2",
        placeholder: "Address Line 2"
    },
    landlordAddressCity: {
        label: "Town/City *",
        name: "addressCity",
        placeholder: "Town/City"
    },
    landlordAddressCounty: {
        label: "County",
        name: "addressCounty",
        placeholder: "County"
    }
};