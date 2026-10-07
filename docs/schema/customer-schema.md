# Customer Schema

Defined in `prisma/schema/customer.prisma`.

## Contents

- [Model: `Customer`](#model-customer)

---

## Model: `Customer`

Stores the personal and contact details of a customer who has placed an order.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `Int` | autoincrement | Primary key |
| `firstName` | `String` | — | Customer first name |
| `LastName` | `String` | — | Customer last name |
| `email` | `String` | — | Customer email address |
| `phone` | `String` | — | Customer phone number |
| `address` | `String` | — | Customer address |
| `createdAt` | `DateTime` | `now()` | Creation timestamp |

### Relations

| Field | Type | Description |
|---|---|---|
| `Order` | `Order[]` | Orders placed by this customer |
