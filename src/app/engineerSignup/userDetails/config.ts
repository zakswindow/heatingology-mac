import { EngineerTitle } from "@prisma/client";
import { CreateUserInput } from "./validate";

type TTextInputField = {
    name: Partial<keyof CreateUserInput>;
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
    }
};

export const USER_SELECTION_INPUTS: Record<
    string,
    {
        name: Partial<keyof CreateUserInput>;
        label: string;
        // options: string[]
        options: {
            value: EngineerTitle,
            label: EngineerTitle
        }[]
    }
> = {
    title: {
        label: 'Title',
        name: 'title',
        options: [
            {
                value: EngineerTitle.MR,
                label: EngineerTitle.MR 
            },
            {
                value: EngineerTitle.MRS,
                label: EngineerTitle.MRS 
            },
            {
                value: EngineerTitle.MS,
                label: EngineerTitle.MS 
            },
            {
                value: EngineerTitle.DR,
                label: EngineerTitle.DR 
            },
            {
                value: EngineerTitle.MX,
                label: EngineerTitle.MX 
            }
        ]
        // options: [EngineerTitle.MR, EngineerTitle.MRS, EngineerTitle.MS, EngineerTitle.DR, EngineerTitle.MX] 
    } 
};

export const USER_IMAGE_INPUTS: Record<
    string,
    TTextInputField
> = {
    profileImage: {
        label: "Profile Image", 
        name: "profileImage"
    }
};