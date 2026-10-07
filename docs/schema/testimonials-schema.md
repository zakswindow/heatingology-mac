# Testimonials Schema

Defined in `prisma/schema/testimonials.prisma`.

## Contents

- [Model: `Testimonials`](#model-testimonials)

---

## Model: `Testimonials`

A customer testimonial displayed on the marketing site. The composite primary key of `customerName` + `customerRole` enforces uniqueness per person-role pair.

| Field | Type | Description |
|---|---|---|
| `customerName` | `String` | Customer's full name (part of composite PK) |
| `customerRole` | `String` | Customer's role or description (part of composite PK) |
| `statement` | `String` | The testimonial text |
