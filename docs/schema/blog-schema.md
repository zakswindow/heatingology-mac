# Blog Schema

Defined in `prisma/schema/blog.prisma`.

## Contents

- [Model: `Blog`](#model-blog)
- [Model: `BlogCategory`](#model-blogcategory)
- [Enums](#enums)
  - [`BLOG_CATEGORIES`](#blog_categories)

---

## Model: `Blog`

A blog post. Posts are hidden from the frontend until `published` is set to `true`. Served via `/api/blogs` and displayed at `/blogs`.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `String` | `cuid()` | Primary key |
| `title` | `String` | — | Post title |
| `content` | `String` | — | Post body (HTML or markdown) |
| `published` | `Boolean` | `false` | Whether the post is publicly visible |
| `categoryId` | `BLOG_CATEGORIES` | — | Foreign key to `BlogCategory` (required) |
| `image` | `String?` | — | Cover image URL |
| `readTime` | `Int?` | `0` | Estimated read time in minutes |
| `viewCount` | `Int?` | `0` | Number of views |
| `metaTitle` | `String` | `""` | SEO meta title |
| `metaDescription` | `String` | `""` | SEO meta description |
| `publishedAt` | `DateTime?` | — | Date the post was published |
| `createdAt` | `DateTime` | `now()` | Creation timestamp |
| `updatedAt` | `DateTime` | auto | Last update timestamp |

### Relations

| Field | Type | Description |
|---|---|---|
| `category` | `BlogCategory` | The category this post belongs to |

---

## Model: `BlogCategory`

Lookup table mapping a `BLOG_CATEGORIES` enum value to a display label.

| Field | Type | Description |
|---|---|---|
| `id` | `Int` | autoincrement (not the primary key — `categoryId` is unique) |
| `categoryId` | `BLOG_CATEGORIES` | Unique enum value used as the logical key |
| `label` | `String` | Human-readable category name |

### Relations

| Field | Type | Description |
|---|---|---|
| `Blog` | `Blog[]` | Posts in this category |

---

## Enums

### `BLOG_CATEGORIES`

| Value | Description |
|---|---|
| `VIEW_ALL` | Catch-all used to show all posts |
| `HOME_HEATING` | General home heating content |
| `CUSTOMER_STORIES` | Customer case studies |
| `BOILER_GUIDE` | Boiler buying and usage guides |
| `HEAT_PUMP_GUIDE` | Heat pump buying and usage guides |
| `BOILER_SERVICE` | Boiler servicing content |
| `UNKONWN` | Uncategorised (note: typo in schema) |
