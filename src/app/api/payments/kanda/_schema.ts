import { z } from 'zod';

// Enum for work types
const WorkTypeEnum = z.enum([
    'air_conditioning',
    'alarm_systems',
    'artificial_grass',
    'bathrooms_supply_and_fitted',
    'bathrooms_supply_only',
    'boiler_swap',
    'cctv',
    'central_heating_system',
    'conservatory',
    'conservatory_roof',
    'decking',
    'door_canopy',
    'doors',
    'driveways',
    'electrical_installation',
    'ev_charger',
    'fencing',
    'fireplaces',
    'flooring_excluding_carpets',
    'garage_doors',
    'garden_buildings',
    'gates',
    'granite_worktops',
    'home_study',
    'hot_tubs_and_spas',
    'kitchens_fitted',
    'kitchens_supply_only',
    'landscaping',
    'loft_boarding',
    'painting_and_decorating',
    'patios',
    'plastering',
    'resin_driveways',
    'roofing_excl_flat_roofs',
    'roofline',
    'rendering',
    'security_lighting',
    'staircases',
    'tiling',
    'underfloor_heating',
    'verandas',
    'wall_insulation_and_cladding',
    'windows',
    'windows_and_doors',
    'other'
]);

// Money/Price schema
const MoneySchema = z.object({
    currency: z.string(), // You might want to use z.enum(['GBP', 'USD', ...]) if you have specific currencies
    amount: z.number().int()
});

// Address schema
const AddressSchema = z.object({
    building_number: z.string().optional(),
    building_name: z.string().optional(),
    line_1: z.string(),
    line_2: z.string().optional(),
    city: z.string(),
    county: z.string(),
    country: z.string(),
    postcode: z.string(),
    months_at_address: z.number().int().optional()
});

// Customer schema
const CustomerSchema = z.object({
    first_name: z.string(),
    last_name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: AddressSchema
});

// Job item schema
const JobItemSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    quantity: z.number().int(),
    price: MoneySchema,
    vat_rate: z.string(), // You might want to use z.enum(['vat_not_set', ...]) if you have specific VAT rates
    vat: MoneySchema
});

// Redirect URLs schema
const RedirectUrlsSchema = z.object({
    checkout_url: z.string().url(),
    success_url: z.string().url(),
    failure_url: z.string().url(),
    webhook_url: z.string().url()
});

// Main schema
export const CreateCheckoutRedirectSchema = z.object({
    reference: z.string(),
    work_type: z.string().optional(),
    // work_type: WorkTypeEnum,
    enabled_rates: z.array(z.string()), // Can be empty array
    deposit_type: z.string(), // You might want to use z.enum(['no_deposit', ...]) if you have specific deposit types
    deposit_value: MoneySchema,
    customer: CustomerSchema,
    job_items: z.array(JobItemSchema),
    redirect_urls: RedirectUrlsSchema
});

export type CreateCheckoutRedirectInput = z.infer<typeof CreateCheckoutRedirectSchema>;

// Example usage:
// const parsedData = jobSchema.parse(yourJsonData);
// const safeParseResult = jobSchema.safeParse(yourJsonData);