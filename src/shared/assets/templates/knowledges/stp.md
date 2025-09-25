# Package: stepper

## Imports
```kotlin
import com.nexsoft.component.code.stepper.And_stp_dft_m
import com.nexsoft.component.code.stepper.And_stp_card_m
```
Choose `_s` or `_l` for smaller or larger touch targets.

## Component Overview
- `And_stp_dft_*` renders a numeric stepper with minus/plus buttons flanking a text field.
- `And_stp_card_*` applies the same mechanics within a card-style container (rounded background plus border) for use on surfaces like product cards.
- Both variants wrap `StepperComponentV2`, handling input validation, boundary checks, and semantics.

## Quick Start
```kotlin
@Composable
fun QuantitySelector() {
    var qty by rememberSaveable { mutableIntStateOf(1) }

    And_stp_dft_m(
        initialValue = qty,
        minValue = 1,
        maxValue = 10,
        onValueChange = { qty = it }
    )
}
```
`onValueChange` is invoked whenever the internal value changes (increment, decrement, or manual edit). Keep your external state in sync to avoid surprises.

## Parameters (shared by all variants)
- `initialValue: Int = 0` - Starting value shown in the field. When the composable recomposes with a different `initialValue`, the internal state resets; wrap the call in `key(initialValue)` if you control it externally.
- `minValue: Int = 0` - Lower bound; the minus button disables when the value reaches this limit.
- `maxValue: Int = 10000` - Upper bound; the plus button disables at this limit.
- `onValueChange: (Int) -> Unit = {}` - Callback with the current value after every change (debounced via `LaunchedEffect`).

### Size Differences
- `_s` - 24 dp icons, compact text field; ideal for dense tables.
- `_m` - 32 dp icons; suits most forms and dialogs.
- `_l` - 40 dp icons with a wider field; best for accessibility-forward layouts.

### Visual Styles
- **Default (`And_stp_dft_*`)** - Transparent background; rely on surrounding container styling.
- **Card (`And_stp_card_*`)** - Adds a white background, rounded corners, and a border via `isCardType = true`.

## Supporting Types
### `StepperComponentV2`
- Core implementation surface. Extra knobs include `componentSize`, `isCardType`, `iconColor`, and `borderColor`. Use it directly to align the stepper with bespoke themes or iconography.

### `ComponentSize`
- Determines icon size, text size, and field width. Shared enum ensures consistent sizing with other components in the design system.

## Usage Notes
- User-entered text is validated; non-numeric characters are ignored and empty input is allowed until the user confirms a value within bounds.
- Clamp your own state when merging remote updates to avoid exceeding `minValue` or `maxValue`; the UI will ignore invalid writes.
- Provide descriptive labels (for example, "Quantity") via surrounding text for accessibility; the stepper itself only exposes control semantics.
- For alternate color schemes (danger, success), override `iconColor` and `borderColor` by calling `StepperComponentV2` directly.
- When placing multiple steppers in a grid, maintain consistent `componentSize` to keep row heights aligned.
