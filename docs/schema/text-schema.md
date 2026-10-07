# Text Schema

Defined in `prisma/schema/text.prisma`.

## Contents

- [Model: `Text`](#model-text)
- [Enums](#enums)
  - [`HtmlTag`](#htmltag)

---

## Model: `Text`

A structured content block associated with a `Product`. Used to build rich product descriptions from individual tagged segments rather than a single string.

| Field | Type | Default | Description |
|---|---|---|---|
| `id` | `Int` | autoincrement | Primary key |
| `tag` | `HtmlTag` | — | Semantic type of the content block (required) |
| `content` | `String` | — | The text content |
| `productId` | `String?` | — | Optional foreign key to `Product` |

### Relations

| Field | Type | Description |
|---|---|---|
| `Product` | `Product?` | The product this block belongs to |

---

## Enums

### `HtmlTag`

Controls how the block is rendered in the frontend.

| Value | Description |
|---|---|
| `PARAGRAPH` | Rendered as a `<p>` element |
| `LIST` | Rendered as a list item |
| `HEADER` | Rendered as a heading |
| `NONE` | No semantic tag / plain text |
