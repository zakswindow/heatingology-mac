# Order Schema

Defined in `prisma/schema/order.prisma`.

## Contents

- [Model: `Order`](#model-order)
- [Model: `OrderItem`](#model-orderitem)
- [Enums](#enums)
  - [`OrderStatus`](#orderstatus)

---

## Model: `Order`

Represents a completed purchase order placed by a customer.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `Int` | autoincrement | Primary key |
| `status` | `OrderStatus` | — | Current status of the order (required) |
| `customerId` | `Int` | — | Foreign key to `Customer` |
| `totalAmout` | `Int` | `0` | Total order amount in pence |
| `createdAt` | `DateTime` | `now()` | Creation timestamp |

### Relations

| Field | Type | Description |
|---|---|---|
| `customer` | `Customer` | The customer who placed the order |
| `OrderItem` | `OrderItem[]` | Individual line items in the order |

---

## Model: `OrderItem`

A single product line within an `Order`.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `Int` | autoincrement | Primary key |
| `orderId` | `Int` | — | Foreign key to `Order` |
| `productId` | `String` | — | Foreign key to `Product` |
| `price` | `Int` | `0` | Price of this line item in pence |

### Relations

| Field | Type | Description |
|---|---|---|
| `order` | `Order` | The parent order |
| `product` | `Product` | The product on this line |

---

## Enums

### `OrderStatus`

| Value | Description |
|---|---|
| `PENDING` | Order created, awaiting processing |
| `IN_PROGRESS` | Installation underway |
| `CANCELLED` | Order was cancelled |
| `DONE` | Installation completed |
