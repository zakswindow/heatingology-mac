import { z } from "zod";
import { QualificationCategory } from "@prisma/client";

export const CreateQualificationSchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'Qualification name is required')
        .max(50, 'Qualification name too long'),
  
    category: z.nativeEnum( QualificationCategory, { errorMap: () => ({ message: `Qualification category must be either ${Object.values(QualificationCategory).join(' or ')}` }) }),
  
    subCategory: z.string().optional()
});

export type CreateQualificationInput = z.infer<typeof CreateQualificationSchema>;