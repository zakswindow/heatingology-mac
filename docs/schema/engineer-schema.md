# Engineer Schema

Defined in `prisma/schema/engineer.prisma`.

## Contents

- [Model: `Engineer`](#model-engineer)
- [Model: `Company`](#model-company)
- [Model: `Qualification`](#model-qualification)
- [Model: `QualificationCategory`](#model-qualificationcategory)
- [Enums](#enums)
  - [`EngineerTitle`](#engineertitle)
  - [`CompanyType`](#companytype)
  - [`QUALIFICATION_CATEGORY`](#qualification_category)

---

## Model: `Engineer`

Represents an individual engineer who is registered on the platform. An engineer always belongs to a `Company` and holds a set of certifications stored as document URLs with expiry dates.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `String` | `cuid()` | Primary key |
| `title` | `EngineerTitle` | — | Salutation (required) |
| `firstName` | `String` | — | First name |
| `lastName` | `String` | — | Last name |
| `contactNumber` | `String` | — | Phone number |
| `email` | `String` | — | Email address |
| `companyId` | `String` | — | Foreign key to `Company` |
| `profileUrl` | `String` | — | Profile photo URL |
| `gasSafeCardFrontUrl` | `String` | — | Gas Safe card front image URL |
| `gasSafeCardRearUrl` | `String` | — | Gas Safe card rear image URL |
| `gasSafeCardExpiryDate` | `DateTime` | — | Gas Safe card expiry |
| `ccnUrl` | `String` | — | CCN certificate URL |
| `ccnExpiryDate` | `DateTime` | — | CCN certificate expiry |
| `insuranceUrl` | `String` | — | Insurance document URL |
| `insuranceExpiryDate` | `DateTime` | — | Insurance expiry |
| `fgaUrl` | `String` | — | FGA certificate URL |
| `fgaExpiryDate` | `DateTime` | — | FGA certificate expiry |
| `dbsUrl` | `String` | — | DBS check document URL |
| `dbsIssueDate` | `DateTime` | — | DBS issue date |
| `locations` | `String[]` | — | Postcodes / areas the engineer covers |

### Relations

| Field | Type | Description |
|---|---|---|
| `company` | `Company` | The company this engineer belongs to |
| `qualifications` | `Qualification[]` | Qualifications held by this engineer (via `EngQualifications` relation) |

---

## Model: `Company`

A business entity that employs one or more engineers.

| Field | Type | Description |
|---|---|---|
| `id` | `String` | Primary key (`cuid()`) |
| `name` | `String` | Company name |
| `gasSafeLicense` | `String` | Gas Safe licence number |
| `gasSafeNumber` | `String` | Gas Safe registration number |
| `address` | `String` | Registered address |
| `type` | `CompanyType` | Business structure |
| `vatRegistered` | `Boolean` | Whether the company is VAT registered |
| `companyNumber` | `String` | Companies House number |

### Relations

| Field | Type | Description |
|---|---|---|
| `engineers` | `Engineer[]` | Engineers belonging to this company |

---

## Model: `Qualification`

A named qualification that can be assigned to multiple engineers.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `Int` | autoincrement | Primary key |
| `name` | `String` | — | Qualification name |
| `categoryId` | `QUALIFICATION_CATEGORY` | `OTHER` | Category this qualification belongs to |
| `subCategory` | `String?` | — | Optional sub-category label |

### Relations

| Field | Type | Description |
|---|---|---|
| `category` | `QualificationCategory` | The category record for this qualification |
| `engineers` | `Engineer[]` | Engineers who hold this qualification |

---

## Model: `QualificationCategory`

Lookup table mapping a `QUALIFICATION_CATEGORY` enum value to a display label.

| Field | Type | Description |
|---|---|---|
| `categoryId` | `QUALIFICATION_CATEGORY` | Primary key (unique enum value) |
| `label` | `String` | Human-readable label |

---

## Enums

### `EngineerTitle`

| Value |
|---|
| `MR` |
| `MRS` |
| `MS` |
| `DR` |
| `MX` |

### `CompanyType`

| Value | Description |
|---|---|
| `LIMITED_COMPANY` | Ltd company |
| `SOLE_TRADER` | Sole trader |

### `QUALIFICATION_CATEGORY`

| Value | Description |
|---|---|
| `GAS_SAFE` | Gas Safe related qualifications |
| `INSTALL_ABILITIES` | Installation capability qualifications |
| `TECHNICAL_ABILITIES` | Technical/trade qualifications |
| `OTHER` | Uncategorised |
