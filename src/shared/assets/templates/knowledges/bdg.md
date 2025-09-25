# Package: badge

Use the `com.nexsoft.component.code.badge` package to pin status badges onto any composable you provide. Each function wraps your `content` slot with `BadgeComponent`, so you only need to supply the badge data and the underlying UI.

## Getting started
- Import the variants you need, e.g.:
  ```kotlin
  import com.nexsoft.component.code.badge.And_bdg_number_m
  ```
- Call the composable with your base content:
  ```kotlin
  And_bdg_number_m(number = 5) {
      Text("Inbox")
  }
  ```

### Shared parameters
- `showBadge: Boolean = true` - toggle visibility without removing layout.
- `offsetOutside: Boolean = false` - when `true`, nudges the badge outside the host bounds so it floats on the corner.
- `alignment: Alignment` - anchor corner for the badge (defaults vary by variant; all values come from `androidx.compose.ui.Alignment`).
- `content: @Composable () -> Unit` - required slot that renders your base component.
- Sizes: `m` variants use a 16.dp badge; `l` variants increase to ~20.dp for better legibility on larger content.

## Icon badges `And_bdg_ico_*`
Places a circular badge containing an `ImageVector`. Designed for success/check indicators or contextual icons.

- Signature: `@Composable fun And_bdg_ico_<size>(icon: ImageVector, showBadge: Boolean = true, offsetOutside: Boolean = false, alignment: Alignment = Alignment.TopEnd, content: @Composable () -> Unit)`
- The badge uses the success accent color and a white border to stand out above imagery.

Example:
```kotlin
And_bdg_ico_l(icon = Icons.Default.Star, offsetOutside = true) {
    ProductCard(product)
}
```

## Legend badges `And_bdg_lgd_*`
Shows a solid circular legend dot (no icon) for "online", "live", or premium states. Defaults to `Alignment.BottomEnd` so it sits on the lower corner.

- Signature: `@Composable fun And_bdg_lgd_<size>(showBadge: Boolean = true, offsetOutside: Boolean = false, alignment: Alignment = Alignment.BottomEnd, content: @Composable () -> Unit)`

## Number badges `And_bdg_number_*`
Displays a numeric counter. Large values automatically clamp to `99+` for readability.

- Signature: `@Composable fun And_bdg_number_<size>(number: Int, showBadge: Boolean = true, offsetOutside: Boolean = false, alignment: Alignment = Alignment.TopEnd, content: @Composable () -> Unit)`
- Provide positive integers; negative inputs are rendered as-is, so sanitize upstream if needed.

## Text badges `And_bdg_txt_*`
Renders arbitrary text (e.g., "New", "Beta", "Live") in a pill-shaped badge.

- Signature: `@Composable fun And_bdg_txt_<size>(text: String, showBadge: Boolean = true, offsetOutside: Boolean = false, alignment: Alignment = Alignment.TopEnd, content: @Composable () -> Unit)`
- Keep text short; longer phrases scale with the badge height but may truncate visually on small hosts.

### Usage tips
- Wrap the badge call in a parent `Box` if you need to combine multiple overlays (e.g., badge + shadow).
- When `offsetOutside = true`, ensure the surrounding layout has enough padding so the badge is not clipped.
- Because these functions return `Unit`, compose them in place within list items, cards, or image containers.
