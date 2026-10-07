import { z } from "zod";

export const CreateSaveOuoteSchema = z.object({
    name: z
        .string()
        .min(1, 'Name is required')
        .max(50, 'Name must not exceed 50 characters')
        .regex(/^[a-zA-Z\s-']+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
    
    contactNumber: z.string().optional(),
  
    email: z
        .string()
        .email('Please enter a valid email address')
        .max(100, 'Email must not exceed 100 characters')
        .toLowerCase()
});

export type CreateSaveOuoteInput = z.infer<typeof CreateSaveOuoteSchema>;