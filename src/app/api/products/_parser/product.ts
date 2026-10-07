import { z } from 'zod';

export const CreateProductSchema = z.object({
    name: z.string().trim().min(1, 'Product name is required').max(60, 'Product name too long'),
    price: z.number().default(0)
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;