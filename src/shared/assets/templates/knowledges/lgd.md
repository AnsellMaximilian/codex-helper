# Package: legend

Legend helpers live in `com.nexsoft.component.code.legend` and wrap the base `LegendComponent`. They render color chips and labels for charts.

Variants:
- `And_lgd_{s|m|l}_h` - horizontal layout using `ComponentSize.SMALL`, `MEDIUM`, or `LARGE`.
- `And_lgd_{s|m|l}_v` - vertical layout with the same size scaling.

## Getting started
```kotlin
import com.nexsoft.component.code.legend.And_lgd_m_h
import com.nexsoft.component.base.legend.LegendItem

val legendItems = listOf(
    LegendItem(name = "Revenue", color = Color(0xFF3875F6)),
    LegendItem(name = "Cost", color = Color(0xFFE94256)),
    LegendItem(name = "Profit", color = Color(0xFF2EB67D)),
)

And_lgd_m_h(divideBy = 3, items = legendItems)
```

### Parameters
- `divideBy: Int` - number of items per row (horizontal) or column (vertical). The component chunks the list accordingly.
- `items: List<LegendItem>` - each item carries a `name` and `Color`. Provide unique names/ids when associating with chart series.

### Behaviour
- Size suffix (`s`, `m`, `l`) controls chip diameter and text size.
- Horizontal layout groups items into rows, vertical layout into columns. Adjust `divideBy` to balance the grid.
- Items are clickable; the base component accepts an `onClick` callback. The wrappers currently leave it null. Drop to `LegendComponent` if you need to handle clicks (e.g., toggling series visibility).

### Tips
- Keep labels short; each chip reserves about 64.dp for text and truncates overflow.
- To align legends with charts, place them in a `Column`/`Row` with appropriate spacing rather than relying on internal padding.
- When you need more control over colours or typography, call `LegendComponent` directly-you can set `componentSize`, `legendAlignment`, and provide a custom `onClick` lambda.

### Related base APIs
- `LegendItem` - data holder (`id` defaults to a random UUID if not provided).
- `LegendComponent(divideBy, items, componentSize, legendAlignment, onClick)` - base implementation with more customisation points.
- `LegendAlignment` - enum used internally (`HORIZONTAL`, `VERTICAL`).
