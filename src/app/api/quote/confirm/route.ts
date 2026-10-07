import { getCompanyNotify } from "@/assets/emails/companyNotify";
import { getServiceConfirmEmailTemplate } from "@/assets/emails/serviceComfirm";
import { prisma } from "@/lib/prisma";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { Quote } from "@prisma/client";
import { NextRequest } from "next/server";

const sesClient = new SESClient({
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string
    }
});

async function sendOrderToCompany ({ quoteData }) {
    const companyEmail = "orders@heatingology.co.uk";
    const params = {
        Source: process.env.AWS_FROM_EMAIL, // Must be verified in SES
        Destination: { ToAddresses: [companyEmail] },
        Message: {
            Subject: { Data: "New Checkout Notification" },
            Body: { Html: { Data: getCompanyNotify({ quoteData }) } }
        }
    };
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    return response;
}

export async function POST(request: NextRequest) {
    try {
        const { to, quoteId } = await request.json();
        const quoteData = await prisma.quote.findUnique({ where: { id: quoteId } }) as Quote;

        if (!quoteData) {
            return Response.json({ error: "Quote not found" }, { status: 404 });
        }

        const userEmailCommand = new SendEmailCommand({
            Source: process.env.AWS_FROM_EMAIL,
            Destination: { ToAddresses: [to] },
            Message: {
                Subject: { Data: "Here is your service confirmation!" },
                Body: { Html: { Data: getServiceConfirmEmailTemplate({ quoteData }) } }
            }
        });

        const [userResult, companyResult] = await Promise.allSettled([
            sesClient.send(userEmailCommand),
            sendOrderToCompany({ quoteData })
        ]);

        if (userResult.status === "rejected") {
            console.error("Failed to send user confirmation email:", userResult.reason);
        }
        if (companyResult.status === "rejected") {
            console.error("Failed to send company notification email:", companyResult.reason);
        }

        return Response.json({
            success: true,
            messageId: userResult.status === "fulfilled" ? userResult.value.MessageId : null,
            notify: companyResult.status === "fulfilled" ? companyResult.value.MessageId : null
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}