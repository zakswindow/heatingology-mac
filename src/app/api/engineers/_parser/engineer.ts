import z from 'zod';
// Helper schemas
const urlSchema = z.string()
    .trim()
    .refine(
        (val) => !val || val.startsWith('http://') || val.startsWith('https://'),
        'Must be a valid URL'
    )
    .default('');

// TODO: Set default expiry date properly.
const futureDateSchema = z.coerce.date().refine(
    (date) => date > new Date(),
    'Expiry date must be in the future'
).optional().default(new Date(2025, 12, 31));

export const CreateEngineerSchema = z.object({
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
  
    // License & Company
    gasSafeLicense: z.string()
        .trim()
        .min(1, 'Gas Safe License is required')
        .regex(/^[A-Z0-9]+$/i, 'Invalid license format')
        .transform(val => val.toUpperCase()),
  
    companyId: z.string()
        .trim()
        .min(1, 'Company ID is required'),
  
    // Document URLs
    profileUrl: urlSchema,
    gasSafeCardFrontUrl: urlSchema,
    gasSafeCardRearUrl: urlSchema,
    ccnUrl: urlSchema,
    insuranceUrl: urlSchema,
    fgaUrl: urlSchema,
    dbsUrl: urlSchema,
  
    // Expiry Dates
    gasSafeCardExpiryDate: futureDateSchema,
    ccnExpiryDate: futureDateSchema,
    insuranceExpiryDate: futureDateSchema,
    fgaExpiryDate: futureDateSchema,
    dbsExpiryDate: futureDateSchema,
  
    // Locations
    locations: z.array(z.string().trim())
        .min(1, 'At least one location is required')
        .transform(locations => [...new Set(locations)]) // Remove duplicates
});

export type CreateEngineerInput = z.infer<typeof CreateEngineerSchema>;