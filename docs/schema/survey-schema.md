# Survey Schema

Defined in `prisma/schema/survey.prisma`.

## Contents

- [Model: `Survey`](#model-survey)
- [Enums](#enums)
  - [`CustomerTitle`](#customertitle)

---

## Model: `Survey`

A pre-installation survey submission. Captures customer contact details and up to six property photos uploaded via AWS S3. Submitted through `/api/survey`, which also sends a notification email via AWS SES.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `Int` | autoincrement | Primary key |
| `title` | `CustomerTitle` | — | Customer salutation (required) |
| `firstName` | `String` | — | Customer first name |
| `lastName` | `String` | — | Customer last name |
| `email` | `String` | — | Customer email address |
| `contactNumber` | `String` | — | Customer phone number |
| `note` | `String?` | — | Additional notes from the customer |
| `gasMeterAreaImage` | `String?` | — | S3 URL — photo of the gas meter area |
| `frontOfPropertyImage` | `String?` | — | S3 URL — photo of the front of the property |
| `proposedBoilerLocationImage` | `String?` | — | S3 URL — photo of the proposed boiler location |
| `areaBelowBoilerImage` | `String?` | — | S3 URL — photo of the area below the boiler |
| `flueImage` | `String?` | — | S3 URL — photo of the flue |
| `areaAboveBoilerImage` | `String?` | — | S3 URL — photo of the area above the boiler |

---

## Enums

### `CustomerTitle`

| Value |
|---|
| `MR` |
| `MISS` |
| `MRS` |
| `MS` |
