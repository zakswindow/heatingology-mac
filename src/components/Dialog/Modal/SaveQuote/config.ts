import { CreateSaveOuoteInput } from "./_schema";

export const SAVE_QUOTE_TEXT_INPUTS: Record<
    keyof CreateSaveOuoteInput,
    {
        label: string;
        name: Partial<keyof CreateSaveOuoteInput>;
    }
> = 
{
    name: {
        label: "Your name *",
        name: "name"
    },
    email: {
        label: "Email address *",
        name: "email"
    },
    contactNumber: {
        label: "Phone number (optional)",
        name: "contactNumber"
    }
};