import { z } from "zod";

// Define accepted file types and max size
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const imageSchema = z
    .any()
    .refine((file) => { return file?.name; }, "Image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 10MB.`)
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
    );

export const CreateDocumentsSchema = z.object({
    gasSafeCardFront: imageSchema,
    gasSafeCardRear: imageSchema,
    gasSafeCardExpiryDate: z.string()
        .min(1, 'Expiry date is required')
        .refine((date)=> {
            const parsedDate = new Date(date);
            const now = new Date();

            return parsedDate >= now;
        }, "Expiry date cannot be in the past"),
    ccn: imageSchema,
    ccnExpiryDate: z.string()
        .min(1, 'Expiry date is required')
        .refine((date)=> {
            const parsedDate = new Date(date);
            const now = new Date();

            return parsedDate >= now;
        }, "Expiry date cannot be in the past"),
    insurance: imageSchema,
    insuranceExpiryDate: z.string()
        .min(1, 'Expiry date is required')
        .refine((date)=> {
            const parsedDate = new Date(date);
            const now = new Date();

            return parsedDate >= now;
        }, "Expiry date cannot be in the past"),
    fga: imageSchema,
    fgaExpiryDate: z.string()
        .min(1, 'Expiry date is required')
        .refine((date)=> {
            const parsedDate = new Date(date);
            const now = new Date();

            return parsedDate >= now;
        }, "Expiry date cannot be in the past"),
    dbs: imageSchema,
    dbsIssueDate: z.string()
        .min(1, 'Expiry date is required')
        .refine((date)=> {
            const parsedDate = new Date(date);
            const now = new Date();

            return parsedDate < now;
        }, "Expiry date cannot be in the future")
});

export type CreateDocumentsData = z.infer<typeof CreateDocumentsSchema>;