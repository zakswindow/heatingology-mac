import { getQuoteEmailTemplate } from "@/assets/emails/quote";
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

export async function POST(request: NextRequest) {
    try {
        const { to, name, quoteId } = await request.json();
        const quoteData = await prisma.quote.findUnique({
            where: { id: quoteId },
            include: { products: true } 
        }) as Quote;

        const params = {
            Source: process.env.AWS_FROM_EMAIL, // Must be verified in SES
            Destination: { ToAddresses: [to] },
            Message: {
                Subject: { Data: "Here is your quote!" },
                Body: {
                    Html: {
                        Data: getQuoteEmailTemplate({
                            name,
                            quoteData 
                        })
                    }
                }
            }
        };

        const command = new SendEmailCommand(params);
        const response = await sesClient.send(command);

        return Response.json({
            success: true,
            messageId: response.MessageId 
        });
    } catch (error) {
        console.error("Error sending email:", error);
        return Response.json({ error: "Failed to send email" }, { status: 500 });
    }
}