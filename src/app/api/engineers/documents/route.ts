import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
});

export async function POST(req: NextRequest) {
    try {
        const { filename, contentType } = await req.json();

        if (!filename || !contentType) {
            return NextResponse.json(
                { error: 'Missing filename or contentType' },
                { status: 400 }
            );
        }

        // Create a unique key for the S3 object
        const key = `${Date.now()}-${filename}-${Math.random().toFixed(2)}`;

        const command = new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
            Key: key,
            ContentType: contentType
        });
    
        const url = await getSignedUrl(s3Client, command, { expiresIn: 600 }); // URL expires in 10 minutes
        // The URL returned here will be used by the client to upload the file directly
        return NextResponse.json({
            url,
            key 
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        }, { status: 500 });
    }
}