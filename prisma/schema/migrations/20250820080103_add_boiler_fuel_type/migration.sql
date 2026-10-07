-- Only add if STANDARD doesn't exist in BoilerType
-- Check output from Step 1 first, then run:

-- If STANDARD is missing:
ALTER TYPE "BoilerType" ADD VALUE IF NOT EXISTS 'STANDARD';
-- If BACK is missing:
ALTER TYPE "BoilerType" ADD VALUE IF NOT EXISTS 'BACK';

-- If OIL is missing:
ALTER TYPE "FuelType" ADD VALUE IF NOT EXISTS 'OIL';
-- If ELECTRIC is missing:
ALTER TYPE "FuelType" ADD VALUE IF NOT EXISTS 'ELECTRIC';