# Package: progressbarwithlabel

## Imports
```kotlin
import com.nexsoft.component.code.progressbarwithlabel.And_pgrsbarwlabel_pgrsbar_m
import com.nexsoft.component.code.progressbarwithlabel.And_pgrsbarwlabel_spnr_s
```
Add the `_s`, `_m`, or `_l` suffix to match the size you need.

## Component Overview
- `And_pgrsbarwlabel_pgrsbar_*` renders a linear progress bar with a custom label on the left and a percentage readout on the right.
- `And_pgrsbarwlabel_spnr_*` shows a circular progress indicator that overlays the current percentage string in the center.
Each variant builds on the shared progress primitives so you get consistent sizing and typography across the design system.

## Quick Start
```kotlin
@Composable
fun SyncingSection(progress: Float) {
    Column(verticalArrangement = Arrangement.spacedBy(20.dp)) {
        And_pgrsbarwlabel_pgrsbar_m(
            label = "Database sync",
            progress = progress,
            modifier = Modifier.fillMaxWidth()
        )

        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            And_pgrsbarwlabel_spnr_s(progress = progress)
            Text("Do not close the app", style = MaterialTheme.typography.bodySmall)
        }
    }
}
```
The helper automatically formats `progress` (`0f..1f`) into percentages for you.

## Parameters by Variant
### `And_pgrsbarwlabel_pgrsbar_s` / `_m` / `_l`
- `progress: Float` - Determinate value in the `0f..1f` range.
- `modifier: Modifier = Modifier` - Typically paired with `fillMaxWidth()` and padding.
- `label: String = ""` - Leading text label. Leave empty to show only the percentage on the right.
- Size suffix maps to bar height (4 dp, 6 dp, 8 dp) and label typography.
- Always shows the numeric percentage on the trailing edge using an accent color (`Color(0xFF13A1DC)`).

### `And_pgrsbarwlabel_spnr_s` / `_m` / `_l`
- `progress: Float` - Completion ratio; values outside `0f..1f` will be clamped visually by Compose but should be bounded in your state as well.
- `modifier: Modifier = Modifier` - Use to add padding or wrap in a `Box` when layering.
- Size suffix controls the diameter (40 dp / 60 dp / 89 dp) and the center label typography.
- The component converts progress into an integer percentage string (e.g., `"75%"`) and centers it over the spinner.

## Supporting Types
### `ComponentSize`
- Drives consistent sizing for both linear and circular variants. Small/medium/large set the indicator dimensions, font size, and spacing.

### `LinearProgressBarComponent`
- Provides the linear rendering with optional labels and percentage text. In these wrappers `showProgressLabel` is always enabled.

### `CircularProgressBarComponent`
- Supplies the circular layout and text overlay. The wrappers pass the formatted percentage via the `label` argument.

## Usage Notes
- Keep `progress` state in a `rememberSaveable` or view-model so the indicator survives configuration changes.
- When showing both a spinner and bar together, reuse the same progress state to keep the displayed percentages in sync.
- For localized experiences, format the `label` string yourself before passing it if you need translated units (e.g., minutes remaining) the percentage string uses the current locale via standard string formatting.
- If you need custom colors, call the base progress components directly and supply `progressColor`/`trackColor` overrides.
