import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomerTitle } from '@prisma/client';

export const CreateSurveySchema = z.object({
    title: z.nativeEnum(CustomerTitle, { errorMap: () => ({ message: "Invalid title." }) }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    contactNumber: z.string().min(1, 'Contact number is required'),
    note: z.string().optional(),
    gasMeterAreaImage: z.string().min(1, 'Gas meter area image is required'),
    frontOfPropertyImage: z.string().min(1, 'Front of property image is required'),
    proposedBoilerLocationImage: z.string().min(1, 'Proposed boiler location image is required'),
    areaBelowBoilerImage: z.string().min(1, 'Area below boiler image is required'),
    flueImage: z.string().min(1, 'Flue image is required'),
    areaAboveBoilerImage: z.string().min(1, 'Area above boiler image is required')
});

export type TSurveyFormData = z.infer<typeof CreateSurveySchema>;
export const surveyResolver = zodResolver(CreateSurveySchema);

const imageUploadSchema = z.object({
    file: z
        .instanceof(File, { message: "Please upload an image" })
        .refine((file) => file.size <= 5 * 1024 * 1024, { message: "Image size must be less than 5MB" })
        .refine((file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type), { message: "File must be a JPEG, PNG or WebP image" }),
    uploadUrl: z.object({
        key: z.string().min(1, 'Key is required'),
        url: z.string().url('Invalid URL format')
    })
});

const uploadImagesFormSchema = z.object({
    gasMeterAreaImage: imageUploadSchema,
    frontOfPropertyImage: imageUploadSchema,
    proposedBoilerLocationImage: imageUploadSchema,
    areaBelowBoilerImage: imageUploadSchema,
    flueImage: imageUploadSchema,
    areaAboveBoilerImage: imageUploadSchema
});

export type TUploadImagesFormSchema = z.infer<typeof uploadImagesFormSchema>;
export const uploadImagesFormResolver = zodResolver(uploadImagesFormSchema);


const contactDetailsFormSchema = z.object({
    title: z.nativeEnum(CustomerTitle, { errorMap: () => ({ message: "Invalid title." }) }),
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    contactNumber: z.string().min(1, 'Contact number is required'),
    note: z.string().optional()
});

export type TConstactDetailsFormSchema = z.infer<typeof contactDetailsFormSchema>;
export const contactDetailsFormResolver = zodResolver(contactDetailsFormSchema);

export const ContactOnlySurveySchema = contactDetailsFormSchema;
