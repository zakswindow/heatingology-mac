import { z } from "zod";
import { EngineerTitle } from '@prisma/client';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const imageSchema = z
    .any()
    .refine((file) => { return file?.name; }, "Image is required.")
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        '.jpg, .jpeg, .png and .webp files are accepted.'
    );


export const CreateUserSchema = z.object({
    title: z.nativeEnum(EngineerTitle, {
        errorMap: () => {
            return { message: 'Invalid title.' };
        }
    }),
    
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(50, 'First name must not exceed 50 characters')
        .regex(/^[a-zA-Z\s-']+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(50, 'Last name must not exceed 50 characters')
        .regex(/^[a-zA-Z\s-']+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
    contactNumber: z
        .string()
        .regex(
            /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,6}$/, 
            'Please enter a valid phone number'
        ),
  
    email: z
        .string()
        .email('Please enter a valid email address')
        .max(100, 'Email must not exceed 100 characters')
        .toLowerCase(),
    
    profileImage: imageSchema
});

export type CreateUserInput = z.infer<typeof CreateUserSchema>;