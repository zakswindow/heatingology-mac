import { z } from "zod";
import { CompanyType } from "@prisma/client";

export const CreateCompanySchema = z.object({
    name: z.string()
        .trim()
        .min(1, 'Company name is required')
        .max(100, 'Company name too long'),
  
    gasSafeLicense: z.string()
        .trim()
        .min(1, 'Gas Safe License number is required')
        .regex(/^\d{6,7}$/, 'Gas Safe License number must be 6-7 digits'),
    gasSafeNumber: z.string()
        .trim()
        .min(1, 'Gas Safe number is required')
        .regex(/^\d{6,7}$/, 'Gas Safe number must be 6-7 digits'),
  
    address: z.string()
        .trim()
        .min(1, 'Address is required')
        .max(500, 'Address too long'),
  
    type: z.nativeEnum(CompanyType, { errorMap: () => ({ message: `Company type must be either ${Object.values(CompanyType).join(' or ')}` }) }),
  
    vatRegistered: z.string(),

    companyNumber: z.string()
        .trim()
        .min(1, 'Company number is required')
        .max(20, 'Company number is too long')
});

export type CreateCompanyInput = z.infer<typeof CreateCompanySchema>;
export const UpdateCompanySchema = CreateCompanySchema.partial();