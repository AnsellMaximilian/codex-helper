# Package: timeline

## Imports
```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.EmojiEmotions
import com.nexsoft.component.code.timeline.And_tmln_h_4step
import com.nexsoft.component.code.timeline.And_tmln_v_3step
import com.nexsoft.component.base.timeline.TimelineItem
```

## Component Overview
- `And_tmln_h_*step` renders a horizontal milestone bar with icons and captions. Each function enforces an exact item count via `require`.
- `And_tmln_v_*step` builds a vertical timeline with titles, captions, and an optional detail callback. The `*step` suffix again dictates the required item count.
- Both variants delegate to `TimelineComponent`, which draws connectors, dots, and captions using the design-system palette.

## Quick Start
```kotlin
@Composable
fun DeliveryTimeline() {
    val milestones = listOf(
        TimelineItem.Horizontal(icon = Icons.Outlined.EmojiEmotions, caption = "Order placed"),
        TimelineItem.Horizontal(icon = Icons.Outlined.EmojiEmotions, caption = "Packed"),
        TimelineItem.Horizontal(icon = Icons.Outlined.EmojiEmotions, caption = "Shipped"),
        TimelineItem.Horizontal(icon = Icons.Outlined.EmojiEmotions, caption = "Delivered")
    )

    And_tmln_h_4step(
        title = "Shipment progress",
        items = milestones
    )
}
```
Pass exactly four items to `And_tmln_h_4step`; the function throws an `IllegalArgumentException` otherwise.

## Parameters
### Horizontal variants (`And_tmln_h_2step` ... `And_tmln_h_5step`)
- `title: String` -> Caption shown under the timeline.
- `items: List<TimelineItem.Horizontal>` -> Icons and captions for each position. The list size must match the function suffix (2, 3, 4, or 5).
- `modifier: Modifier = Modifier` -> Optional layout adjustments.

### Vertical variants (`And_tmln_v_2step` ... `And_tmln_v_5step`)
- `items: List<TimelineItem.Vertical>` -> Entries rendered from top to bottom. List size must match the function suffix.
- `modifier: Modifier = Modifier` -> Optional layout adjustments.
- `onDetailClick: (TimelineItem.Vertical) -> Unit = {}` -> Invoked when the trailing "Detail" label is tapped.

## Supporting Types
### `TimelineItem.Horizontal`
- `icon: ImageVector` -> Displayed at the milestone node.
- `caption: String` -> Text under the icon.

### `TimelineItem.Vertical`
- `title: String` -> Row heading.
- `caption: String` -> Supporting text under the title.

### `TimelineComponent`
- Base composable that draws connectors, dot indicators, and handles the optional detail action. Use it directly if you need a different number of steps or custom styling.

## Usage Notes
- Because each wrapper enforces a fixed list size, construct the item list with the exact length before calling the composable.
- Icons default to Material icons; import any additional icon sets you reference.
- For the vertical variant, provide a meaningful `onDetailClick` only when detail links exist; leave the default no-op otherwise.
- Place the timeline inside a column or card with padding to keep connectors from touching screen edges.
