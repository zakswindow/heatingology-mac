# Product Schema

Defined in `prisma/schema/product.prisma`.

## Contents

- [Model: `Product`](#model-product)
- [Enums](#enums)
  - [`ProductType`](#producttype)
  - [`BoilerType`](#boilertype)
  - [`FuelType`](#fueltype)
  - [`FlueType`](#fluetype)
  - [`ProductQuality`](#productquality)
  - [`ProductFinanceOpts`](#productfinanceopts)
  - [`TagType`](#tagtype)

---

## Model: `Product`

Represents a purchasable product — boilers, heat pumps, EV chargers, services, and add-ons.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `String` | `cuid()` | Primary key |
| `brand` | `String?` | — | Manufacturer name |
| `model` | `String` | — | Model name |
| `homeowner` | `Boolean?` | `false` | Available to homeowners |
| `landlord` | `Boolean?` | `false` | Available to landlords |
| `warranty` | `String?` | — | Warranty description |
| `specs` | `String[]` | `[]` | List of specification strings |
| `price` | `Float` | `0` | Price excluding VAT |
| `priceWithVat` | `Float` | `0` | Price including VAT |
| `hasVat` | `Boolean` | `false` | Whether VAT applies |
| `minBath` | `Int?` | `0` | Minimum bathrooms suitability |
| `maxBath` | `Int?` | `0` | Maximum bathrooms suitability |
| `minBed` | `Int?` | `0` | Minimum bedrooms suitability |
| `maxBed` | `Int?` | `0` | Maximum bedrooms suitability |
| `productType` | `ProductType` | — | Category/type of product (required) |
| `boilerType` | `BoilerType?` | `UNKNOWN` | Boiler variant (combi, system, etc.) |
| `fuelType` | `FuelType?` | `UNKNOWN` | Fuel the product uses |
| `flueType` | `FlueType?` | `UNKNOWN` | Flue orientation |
| `productImage` | `String?` | — | Primary image URL |
| `productImages` | `String[]` | `[]` | Additional image URLs |
| `description` | `Text[]` | — | Structured description blocks |
| `descriptionMarkdown` | `String?` | `""` | Markdown description |
| `note` | `String?` | — | Internal or display note |
| `rating` | `Float?` | `0` | Product rating |
| `included` | `String[]` | `[]` | What is included in the price |
| `excluded` | `String[]` | `[]` | What is not included |
| `dimensions` | `Json?` | `{}` | Physical dimensions (arbitrary JSON) |
| `tags` | `String[]` | `[]` | Display tags (e.g. `POPULAR`) |

### Relations

| Field | Type | Description |
|---|---|---|
| `OrderItem` | `OrderItem[]` | Line items in orders that include this product |
| `quotes` | `Quote[]` | Quotes that reference this product (via `OrderProducts` relation) |

---

## Enums

### `ProductType`

Determines which part of the purchase flow a product belongs to.

| Value | Description |
|---|---|
| `boiler` | Boiler unit |
| `heatPump` | Heat pump unit |
| `ev_charger` | EV charger unit |
| `ev_charger_extra` | EV charger extra/upgrade |
| `ev_cable` | EV charging cable |
| `boiler_service` | Boiler servicing job |
| `boiler_repair` | Boiler repair job |
| `boiler_add_ons` | Optional add-on for a boiler install |
| `boiler_included` | Item bundled with a boiler install |
| `boiler_not_included` | Item explicitly excluded from a boiler install |
| `boiler_extra` | Paid boiler extra |
| `install_time` | Installation time slot product |
| `install_date` | Installation date product |
| `ev_included` | Item bundled with an EV charger install |

### `BoilerType`

| Value | Description |
|---|---|
| `COMBI` | Combination boiler |
| `SYSTEM` | System boiler |
| `ELECTRIC` | Electric boiler |
| `STANDARD` | Standard/regular boiler |
| `BACK` | Back boiler |
| `UNKNOWN` | Not specified |

### `FuelType`

| Value |
|---|
| `GAS` |
| `LPG` |
| `OIL` |
| `ELECTRIC` |
| `UNKNOWN` |

### `FlueType`

| Value |
|---|
| `HORIZONTAL` |
| `VERTICAL` |
| `UNKNOWN` |

### `ProductQuality`

Used to classify product tier. Not a field on `Product` directly — used elsewhere in the quote flow.

| Value |
|---|
| `GOOD` |
| `BETTER` |
| `BEST` |

### `ProductFinanceOpts`

Finance option flags. Not a field on `Product` directly.

| Value | Description |
|---|---|
| `ZERO_APR` | 0% APR finance |
| `YEARS_ZERO_APR` | Multi-year 0% APR finance |

### `TagType`

| Value | Description |
|---|---|
| `POPULAR` | Display a "Popular" badge on the product |
