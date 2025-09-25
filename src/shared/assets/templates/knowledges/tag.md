# Package: tag

## Imports
```kotlin
import com.nexsoft.component.code.tag.And_tag_dft_otd_m
import com.nexsoft.component.code.tag.And_tag_filter_otd_m
import com.nexsoft.component.base.tag.TagState
```

## Component Overview
- `And_tag_dft_otd_*` renders pill-shaped tags for statuses, metadata chips, or selectable filters.
- `And_tag_filter_otd_*` applies the same styling but appends a trailing chevron icon so users recognise the tag as a dropdown trigger.
- Both variants delegate to `TagComponent`, which controls colors, borders, and optional icons based on `TagState` and `ComponentSize`.

## Quick Start
```kotlin
@Composable
fun CategoryChips(onFilter: () -> Unit) {
    FlowRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
        And_tag_dft_otd_m(text = "Active", state = TagState.Colored)
        And_tag_filter_otd_m(text = "Sort", onClick = onFilter)
        And_tag_dft_otd_m(text = "Archived", state = TagState.Filled, enabled = false)
    }
}
```
Click handling is optional; the tag only becomes interactive when you provide a non-null `onClick` and `enabled = true`.

## Parameters
Shared across default and filter variants (size suffix `_s`, `_m`, `_l` maps to `ComponentSize.SMALL`, `.MEDIUM`, `.LARGE`):
- `text: String` -> Chip label.
- `modifier: Modifier = Modifier` -> Apply padding, width, or semantics.
- `state: TagState = TagState.Default` -> Visual style (`Default`, `Filled`, or `Colored`).
- `onClick: (() -> Unit)? = null` -> Optional tap handler. When `null`, the tag displays as static.
- `enabled: Boolean = true` -> Disables the tag and swaps to muted colors when false.

### Filter Variants
- In addition to the parameters above, `And_tag_filter_otd_*` injects `ImageSource.DrawableResource(R.drawable.ic_chevron_down)` so a chevron icon appears beside the text.

## Supporting Types
### `TagState`
- `Default` -> Transparent background with border.
- `Filled` -> Neutral background, bordered outline.
- `Colored` -> Uses `MaterialTheme.colorScheme.primary` for background and text.

### `TagComponent`
- Base composable that exposes extra knobs: pass a custom `icon`, override `componentSize`, or adjust colors by extending the component.
- Only handles a single icon slot to the right; provide your own layout if you need leading icons or badges.

## Usage Notes
- Keep text short to avoid truncation; tags clip long labels rather than wrapping.
- Use `state = TagState.Colored` sparingly for emphasis (for example, active filters) so the primary color retains meaning.
- When using tags inside clickable parents (cards, list items), provide separate semantics so screen readers understand which element changes state.
- Combine with `enabled = false` to show unavailable filters while preserving layout alignment.
