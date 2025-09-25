# Package: charts

Charts live in `com.nexsoft.component.code.charts`. They wrap the lower-level chart primitives from `com.nexsoft.component.base.charts` so you supply data models and high-level styling without touching Canvas internals.

## Getting started
- Import the composable you need, e.g.:
  ```kotlin
  import com.nexsoft.component.code.charts.And_chart_1bar
  ```
- Build the corresponding data models (`BarItem`, `LineItem`, `PieItem`, and friends) from the base package. Each model carries an auto-generated `id`, a `label`, and context-specific fields (values, colours, entry lists).
- All charts expect pre-computed values; there is no internal aggregation. Prepare percentages or totals before passing them in.

### Data models cheat-sheet
- `BarItem` -> grouped bars for a single X label. Contains `entries: List<BarEntry>` where each `BarEntry` has a `value` and `Color`.
- `DoubleBarItem` -> two bar groups per label. Each `pairs` entry holds a `Pair<List<BarEntry>, List<BarEntry>>` so you can compare series A vs series B side by side.
- `LineItem` -> single data point with `label` (X axis) and `value` (Y axis).
- `PieItem`, `DoughnutItem`, `ProgressItem` -> slice data with `value` determining the angle and `color` for rendering.

All of these classes live under `com.nexsoft.component.base.charts.*`.

## Bar charts
### Single-series `And_chart_1bar`
```kotlin
@Composable
fun And_chart_1bar(
    items: List<BarItem>,
    intervalHorizontal: Int,
    formatHoverText: ((BarEntry) -> String)?
)
```
- `intervalHorizontal` sets how many X labels appear between grid/tick marks. Keep it > 0.
- `formatHoverText` customises the tooltip string. The lambda receives the active `BarEntry`; return a formatted string such as `"IDR ${entry.value.toInt()}"`.

### Double-series `And_chart_2bar`
Same signature as the single-series chart but uses `List<DoubleBarItem>`. Populate each `pairs` list with aligned bar groups:
```kotlin
val stores = DoubleBarItem(
    label = "Week 1",
    pairs = listOf(
        listOf(BarEntry(24f, primaryColor)) to listOf(BarEntry(30f, secondaryColor)),
        listOf(BarEntry(18f, accentColor)) to listOf(BarEntry(21f, neutralColor))
    )
)
And_chart_2bar(items = listOf(stores), intervalHorizontal = 4) { entry -> "${entry.value}%" }
```

## Line chart `And_chart_line`
```kotlin
@Composable
fun And_chart_line(
    items: List<LineItem>,
    intervalHorizontal: Int,
    lineColor: Color,
    lineSize: Float,
    lineGap: Float,
    pointColor: Color,
    pointSize: Float,
    formatHoverText: ((LineItem) -> String)?
)
```
- `lineGap` defines horizontal spacing between successive points in pixels.
- `pointSize` is the diameter in pixels for markers.
- Provide `formatHoverText` to control tooltip text; returning `"${it.label}: ${it.value}"` is a typical pattern.

## Pie chart `And_chart_pie`
```kotlin
@Composable
fun And_chart_pie(
    items: List<PieItem>,
    onLongClick: (PieItem) -> Unit
)
```
- Long-press callbacks are mandatory. Use them for drill-down or context menus.
- Ensure your slice colours provide adequate contrast; there is no automatic palette.

## Doughnut chart `And_chart_dghnt`
```kotlin
@Composable
fun And_chart_dghnt(
    items: List<DoughnutItem>,
    useItemColor: Boolean,
    baseCenterText: String,
    useCustomCenterText: Boolean,
    formatCenterText: ((DoughnutItem, Float) -> String)?,
    onLongClick: (DoughnutItem) -> Unit
)
```
- `useItemColor` switches the centre text tint to the selected slice colour.
- `baseCenterText` displays when nothing is selected or when `useCustomCenterText` is false.
- If `useCustomCenterText` is true and `formatCenterText` is null, the component falls back to `"<label> <percent>%"`.

## Progress doughnut `And_chart_pgrs`
Identical parameters to `And_chart_dghnt` but the chart is rendered as a semi-donut to emphasise completion vs remaining segments. Provide `ProgressItem` data.

## Chart cards
Chart cards wrap a chart with title, legend, and menu surfaces. All live in `com.nexsoft.component.code.charts` and rely on `ChartCardConfig` from the base layer.

### Horizontal vs vertical containers
```kotlin
And_chartcard_h(config, header = "Revenue", showMenu = true, actions = actions)
And_chartcard_v(config, header = "Revenue", showMenu = false, actions = emptyList())
```
- `config: ChartCardConfig` is a sealed hierarchy. Instantiate the matching subclass (e.g. `ChartCardConfig.LineChartConfig`).
- `And_chartcard_h` forces `chartAlignment = HORIZONTAL` and vertical legends. `And_chartcard_v` switches to `VERTICAL` charts with horizontal legends. Pass `config.copy()` if you reuse the same instance more than once to avoid mutating the original alignment.
- `actions: List<ChartCardAction>` populates the overflow menu (three-dot button). Leave it empty to hide the menu even when `showMenu` is true.

Minimal example:
```kotlin
val legends = listOf(
    LegendItem(name = "North", color = primary),
    LegendItem(name = "South", color = secondary)
)
val config = ChartCardConfig.LineChartConfig(
    chartAlignment = ChartAlignment.HORIZONTAL,
    showLegend = true,
    legends = legends,
    legendDividerSize = 8,
    legendSize = ComponentSize.SMALL,
    legendAlignment = LegendAlignment.HORIZONTAL,
    onLegendClick = { legend -> viewModel.toggleRegion(legend.id) },
    items = lineItems,
    configuration = LineConfig(
        intervalHorizontal = 2,
        lineColor = primary,
        lineSize = 4f,
        lineGap = 16f,
        pointColor = accent,
        pointSize = 10f,
        formatHoverText = { "${it.label}: ${it.value.toInt()}" }
    )
)
And_chartcard_h(config = config, header = "Sales trend", showMenu = false, actions = emptyList())
```

Legend guidelines:
- When `showLegend` is true, `legends` must be non-empty and `legendDividerSize >= 1` or the config constructor will throw.
- Provide unique `LegendItem.id` values (defaults are random UUIDs).

### Chart summary card `And_chartcard_card`
```kotlin
@Composable
fun And_chartcard_card(
    top: String,
    iconTopLeft: Painter,
    iconTopRight: Painter,
    colorTop: Color,
    mid: String,
    colorMid: Color,
    bottomLeft: String,
    bottomRight: String,
    iconBottom: Painter,
    colorBottomLeft: Color,
    colorBottomRight: Color,
    onClick: () -> Unit
)
```
Use this when you need a KPIs card with icons but no chart. Supply painters from `painterResource` or remember vector painters. The full card surface is clickable.

## Formatting and interactivity tips
- Tooltips (`formatHoverText`) run on hover-capable platforms (pointer devices). Provide concise strings; long values may clip.
- For all long-click callbacks, debounce in your view model if they launch dialogs repeatedly.
- Colour values are not validated; curate accessible palettes yourself.
- Chart components expect non-empty `items` lists and will throw otherwise.

## Related helpers
- `ChartCardAction` (`name`, `action`) adds overflow actions to chart cards.
- `LegendItem` pairs a display `name` with a `Color` chip.
- `ChartAlignment` and `LegendAlignment` control layout orientation; defaults are overridden by the wrapper functions.

When the stock wrappers are not enough, you can call the base components (`BarChartComponent`, `ContainerChartComponent`, etc.) directly for fine-grained control while reusing the same data classes.
