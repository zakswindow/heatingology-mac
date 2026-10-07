import { ContactOnlySurveySchema, CreateSurveySchema } from "@/lib/_schema/survey.schema";
import { getSurveyNotify } from "@/assets/emails/surveyNotify";
import { prisma } from "@/lib/prisma";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const sesClient = new SESClient({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

export async function GET () {
    try {
        const result = await prisma.survey.findMany({});

        if (!result) {
            throw new Error("Fail to retrieve surveys.");
        }

        return NextResponse.json({
            success: true,
            result
        });
    } catch (e) {
        console.error(e);
    }
}

export async function POST (req: NextRequest) {
    try {
        const body = await req.json();

        const contactOnly = body.contactOnly === true;
        const schema = contactOnly ? ContactOnlySurveySchema : CreateSurveySchema;
        const { success, data: requestData, error } = schema.safeParse(body);
        if (!success) {
            console.error(error);
            throw new Error("Invalid data: ");
        }

        const result = await prisma.survey.create({ data: requestData });
        const companyEmail = "orders@heatingology.co.uk";
        const command = new SendEmailCommand({
            Source: process.env.AWS_FROM_EMAIL,
            Destination: { ToAddresses: [companyEmail] },
            Message: {
                Subject: { Data: "New Survey Request" },
                Body: { Html: { Data: getSurveyNotify({ surveyData: result, contactOnly }) } }
            }
        });
        sesClient.send(command).catch((e) => console.error("Failed to send survey notification email:", e));

        return NextResponse.json({
            success: true,
            result
        });

    } catch (e) {
        console.error(e);
        return NextResponse.json({
            success: false,
            error: (e as Error).message
        });
    }
}