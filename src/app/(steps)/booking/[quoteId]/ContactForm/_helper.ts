import { UseFormReset, UseFormSetValue } from "react-hook-form";
import { CreateContactInput } from "./_schema";
import { Quote } from "@prisma/client";

function getUserType (quoteData) {
    try {
        const { isLandlord = false } = JSON.parse(quoteData.content);

        if (isLandlord) {
            return "landlord";
        }
        return "homeowner";
    } catch (e) {
        console.error("Fail to determine user type.");
        return "homeowner";
    }
}

export function resetFormValue ({ quoteData, reset }: { quoteData: Quote, reset: UseFormReset<CreateContactInput> }) {
    const userType = getUserType(quoteData);

    const formData: any = {
        userType,
        title: quoteData.title || '',
        firstName: quoteData.firstName || '',
        lastName: quoteData.lastName || '',
        contactNumber: quoteData.contactNumber || '',
        email: quoteData.email || '',
        postcode: quoteData.postcode || '',
        addressLine1: quoteData.addressLine1 || '',
        addressLine2: quoteData.addressLine2 || '',
        addressCity: quoteData.addressCity || '',
        addressCounty: quoteData.addressCounty || '',
        note: quoteData.note || ''
    };
    
    if (userType === "landlord") {
        formData.landlordPostcode = quoteData.landlordPostcode || '';
        formData.landlordAddressLine1 = quoteData.landlordAddressLine1 || '';
        formData.landlordAddressLine2 = quoteData.landlordAddressLine2 || '';
        formData.landlordAddressCity = quoteData.landlordAddressCity || '';
        formData.landlordAddressCounty = quoteData.landlordAddressCounty || '';
    }

    reset(formData as CreateContactInput);
}