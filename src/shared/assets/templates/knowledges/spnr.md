# Package: spinner

## Imports
```kotlin
import com.nexsoft.component.code.spinner.And_spnr_s
import com.nexsoft.component.code.spinner.And_spnr_m
import com.nexsoft.component.code.spinner.And_spnr_l
```

## Component Overview
- `And_spnr_s`, `_m`, and `_l` render circular loading indicators sized for compact, regular, or spacious layouts.
- Each wrapper delegates to `SpinnerComponent`, ensuring consistent motion, colors, and accessibility semantics across the app.

## Quick Start
```kotlin
@Composable
fun LoadingState() {
    Box(contentAlignment = Alignment.Center, modifier = Modifier.fillMaxSize()) {
        And_spnr_m(baseColor = MaterialTheme.colorScheme.tertiary)
    }
}
```
Drop the spinner into any container where you need to communicate background work; set `baseColor` to match the context (for example success or warning states).

## Parameters
Shared across all size variants:
- `baseColor: Color = MaterialTheme.colorScheme.primary` - Tint applied to the spinning arc; defaults to the primary brand color.

### Size Differences
- `And_spnr_s` - 40 dp diameter; use inside buttons or tight panels.
- `And_spnr_m` - 60 dp diameter; fits modals or full-screen loaders.
- `And_spnr_l` - 80 dp diameter; best for hero states or large surfaces.

## Supporting Types
### `SpinnerComponent`
- Accepts `componentSize: ComponentSize` and `baseColor`. If you need to tweak track color or embed the spinner in a layered layout, call `SpinnerComponent` directly from `com.nexsoft.component.base.spinner`.

### `ComponentSize`
- Shared sizing enum used throughout the design system (`SMALL`, `MEDIUM`, `LARGE`). The wrappers map directly to these values.

## Usage Notes
- Combine with `Box` and a translucent background to build blocking loaders.
- Pair with text (for example, "Loading data...") for clarity, especially in accessibility scenarios.
- For high-contrast themes, adjust `baseColor` to preserve sufficient contrast against the background.
- Because the spinner is purely visual, manage cancellation or timeouts in your own state logic and swap it out for the final UI when data arrives.
