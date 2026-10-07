import { getUrl } from "./_api";

export function getFile (files) {
    if (!files.length) {
        return;
    }

    const [file] = files;

    if (Blob && file instanceof Blob) {
        return file;
    }
}

type TGetPresignedUrl = {
    filename: string;
    contentType: string;
}

export async function getPresignedUrl (body: TGetPresignedUrl) {
    const url = getUrl("/engineers/documents");
    const method = "POST";

    try {
        const response = await fetch(url, {
            method, 
            body: JSON.stringify(body)
        });
        return await response.json();
    } catch (e) {
        console.error(e);
    }
}

export async function uploadDocument ( { name, file, uploadUrl }: { name: string, file: File, uploadUrl: { key: string; url: string; } }) {
    try {
        // Call backend for presigned url
        // const { key, url } = await getPresignedUrl({
        //     filename: file.name,
        //     contentType: file.type
        // });
        const { key, url } = uploadUrl;

        // upload file to s3
        const uploadResponse = await fetch(url, {
            method: 'PUT',
            body: file,
            headers: { 'Content-Type': file.type }
        });

        if (!uploadResponse.ok) {
            throw new Error("Failed to upload the file.");
        }

        // The public URL of the uploaded file
        const fileUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/${key}`;

        return {
            success: true,
            result: { 
                name,
                fileUrl
            }
        };

    } catch (e) {
        return {
            success: false,
            error: (e as Error).message
        };
    }
    
}