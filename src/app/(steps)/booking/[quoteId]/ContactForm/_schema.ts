import z from 'zod';


const baseSchema = z.object({
    title: z.string(),
    // Personal Information
    firstName: z.string()
        .trim()
        .min(1, 'First name is required')
        .max(50, 'First name too long'),
  
    lastName: z.string()
        .trim()
        .min(1, 'Last name is required')
        .max(50, 'Last name too long'),
  
    contactNumber: z.string()
        .trim()
        .regex(/^[\d\s\-\+$$$$]+$/, 'Invalid phone number format')
        .transform(val => val.replace(/\s+/g, '')), // Remove spaces
  
    email: z.string()
        .trim()
        .toLowerCase()
        .email('Invalid email format'),

    postcode: z.string()
        .trim()
        .min(1, "Postcode is required")
        .max(10, "Postcode is too long"),

    addressLine1: z.string()
        .trim()
        .min(1, "Address is required")
        .max(50, "Address is too long"),

    addressLine2: z.string()
        .trim()
        .max(50, "Address is too long")
        .optional(),

    addressCity: z.string()
        .trim()
        .min(1, "City is required")
        .max(20, "City is too long"),

    addressCounty: z.string()
        .trim()
        .max(50, "County is too long")
        .optional(),

    note: z.string()
        .trim()
        .optional()
});

const homeownerSchema = baseSchema.extend({ userType: z.literal("homeowner") });

const landlordSchema = baseSchema.extend({
    userType: z.literal("landlord"),
    landlordPostcode: z.string()
        .trim()
        .min(1, "Postcode is required")
        .max(10, "Postcode is too long")
        .optional(),

    landlordAddressLine1: z.string()
        .trim()
        .min(1, "Address is required")
        .max(50, "Address is too long")
        .optional(),

    landlordAddressLine2: z.string()
        .trim()
        .max(50, "Address is too long")
        .optional(),

    landlordAddressCity: z.string()
        .trim()
        .min(1, "City is required")
        .max(20, "City is too long")
        .optional(),

    landlordAddressCounty: z.string()
        .trim()
        .max(50, "County is too long")
        .optional()
});

export const CreateContactSchema = z.discriminatedUnion("userType", [homeownerSchema, landlordSchema]);
export type CreateContactInput = z.infer<typeof CreateContactSchema>;