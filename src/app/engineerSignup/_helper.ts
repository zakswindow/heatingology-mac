import { getPresignedUrl, uploadDocument } from "@/lib/_upload";
import { CreateCompanySchema } from "../api/engineers/_parser/company";

async function getImageFileUrl ({ name = "", file }) {
    const presignedUrl = await getPresignedUrl({
        filename: file.name,
        contentType: file.type
    });
    const { result = null } = await uploadDocument({
        name,
        file,
        uploadUrl: presignedUrl
    });

    if (!result) {
        throw new Error("Fail to upload image: ", file.name);
    }
    return result.fileUrl;
}

export async function parseUserDetails (data) {
    try {
        const details = {
            title: data.title,
            firstName: data.firstName,
            lastName: data.lastName,
            contactNumber: data.contactNumber,
            email: data.email
        };

        if (data.profileImage) {
            const profileUrl = await getImageFileUrl({ file: data.profileImage });
            return { ...details, profileUrl };
        }

        return details;
    } catch (e) {
        console.error(e);
        return null;
    }
};

export function parseCompanyDetails (data) {
    return {
        ...data,
        vatRegistered: data.vatRegistered === "true" ? true : false
    };
}

export function parseQualifications (data) {
    return data.map((item) => parseInt(item));
}

export async function parseDocuments (data) {
    const images = [
        data.gasSafeCardFront,
        data.gasSafeCardRear,
        data.ccn,
        data.insurance,
        data.fga,
        data.dbs
    ];

    const promises = images.map((item) => {
        return getImageFileUrl({ file: item });
    });

    return Promise.all(promises).then((response) => {
        const [
            gasSafeCardFront,
            gasSafeCardRear,
            ccn,
            insurance,
            fga,
            dbs
        ] = response;
        
        return {
            gasSafeCardFrontUrl: gasSafeCardFront,
            gasSafeCardRearUrl: gasSafeCardRear,
            gasSafeCardExpiryDate: (new Date(data.gasSafeCardExpiryDate)).toISOString(),
            ccnUrl: ccn,
            ccnExpiryDate: (new Date(data.ccnExpiryDate)).toISOString(),
            insuranceUrl: insurance,
            insuranceExpiryDate: (new Date(data.insuranceExpiryDate)).toISOString(),
            fgaUrl: fga,
            fgaExpiryDate: (new Date(data.fgaExpiryDate)).toISOString(),
            dbsUrl: dbs,
            dbsIssueDate: (new Date(data.dbsIssueDate)).toISOString()
        };
    });
}

export function parseLocations (data) {
    return data;
}