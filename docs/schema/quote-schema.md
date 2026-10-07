# Quote Schema

Defined in `prisma/schema/quote.prisma`.

## Contents

- [Model: `Quote`](#model-quote)
- [Enums](#enums)
  - [`QuoteStatus`](#quotestatus)

---

## Model: `Quote`

Created when a user completes the questionnaire at `/quote/[productType]`. Holds all questionnaire answers, contact details captured during the booking flow, and the selected products.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `String` | `cuid()` | Primary key |
| `content` | `String` | — | Serialised questionnaire answers (required) |
| `productType` | `ProductType` | — | Product category the quote is for (required) |
| `price` | `Float` | `0` | Base price of selected products |
| `extraPrice` | `Float` | `0` | Price of optional extras |
| `status` | `QuoteStatus` | `Pending` | Lifecycle state of the quote |
| `paymentMethod` | `String?` | — | Payment method chosen at checkout (e.g. `stripe`, `paypal`, `kanda`) |
| `postcode` | `String?` | — | Installation postcode |
| `addressLine1` | `String?` | — | Installation address line 1 |
| `addressLine2` | `String?` | — | Installation address line 2 |
| `addressCity` | `String?` | — | Installation city |
| `addressCounty` | `String?` | — | Installation county |
| `title` | `String?` | — | Customer title |
| `firstName` | `String?` | — | Customer first name |
| `lastName` | `String?` | — | Customer last name |
| `email` | `String?` | — | Customer email |
| `contactNumber` | `String?` | — | Customer phone number |
| `userType` | `String?` | — | Whether the customer is a homeowner or landlord |
| `landlordAddressLine1` | `String?` | — | Landlord address line 1 |
| `landlordAddressLine2` | `String?` | — | Landlord address line 2 |
| `landlordAddressCity` | `String?` | — | Landlord address city |
| `landlordAddressCounty` | `String?` | — | Landlord address county |
| `landlordPostcode` | `String?` | — | Landlord postcode |
| `isLandlordAddressBusiness` | `Boolean?` | — | Whether the landlord address is a business |
| `installDate` | `DateTime?` | — | Chosen installation date |
| `installTime` | `String?` | — | Chosen installation time slot |
| `note` | `String?` | — | Free-text note |
| `createdAt` | `DateTime` | `now()` | Creation timestamp |
| `updatedAt` | `DateTime` | auto | Last update timestamp |

### Relations

| Field | Type | Description |
|---|---|---|
| `products` | `Product[]` | Products selected for this quote (via `OrderProducts` relation) |

---

## Enums

### `QuoteStatus`

| Value | Description |
|---|---|
| `Pending` | Quote created but not yet paid |
| `Paid` | Payment received |
| `Completed` | Installation completed |
