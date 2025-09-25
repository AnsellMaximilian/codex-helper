# Package: radiobuttonwithlabel

## Imports
```kotlin
import com.nexsoft.component.code.radiobuttonwithlabel.And_rdobtnwlabel_h_dft_m
import com.nexsoft.component.code.radiobuttonwithlabel.And_rdobtnwlabel_v_dft_m
```
Include `_s` or `_l` variants when you need smaller or larger touch targets.

## Component Overview
- `And_rdobtnwlabel_h_dft_*` renders a titled radio group with options laid out horizontally (wrapping to the next line if needed).
- `And_rdobtnwlabel_v_dft_*` presents the same API but stacks options vertically for long labels or mobile forms.
- Both wrappers expose helper strings for inline helper/error messaging and proxy to `RadioButtonComponent` so accessibility hints and scalable radio indicators stay consistent with the design system.

## Quick Start
```kotlin
@Composable
fun PaymentOptions(
    options: Map<String, String>,
    selected: String?,
    onSelection: (String) -> Unit,
    error: String?
) {
    And_rdobtnwlabel_v_dft_m(
        label = "Payment Method",
        options = options,
        informationText = "Choose one option",
        errorText = error.orEmpty(),
        enabled = error == null,
        onSelected = onSelection
    )
}
```
Manage the current selection in your own state (`rememberSaveable`) so the radio group reflects the latest choice whenever recomposed.

## Parameters
Shared by horizontal (`h`) and vertical (`v`) variants:
- `options: Map<String, String>` - Keys are returned via `onSelected`; values are the visible labels. Provide a stable iteration order (e.g., `linkedMapOf`) if ordering matters.
- `label: String` - Group title positioned above the radio buttons.
- `modifier: Modifier = Modifier` - Apply padding, width, or semantics wrappers to the overall group.
- `enabled: Boolean = true` - Disables every option when false.
- `informationText: String = ""` - Optional hint displayed beneath the group with an info icon. Leave empty to hide it.
- `errorText: String = ""` - When non-empty, shows an error state with icon and red text.
- `onSelected: (String) -> Unit = {}` - Receives the chosen option key whenever a radio is tapped.

### Orientation & Size
- Horizontal (`And_rdobtnwlabel_h_dft_*`) keeps radios in a row; best for short labels or tablet layouts.
- Vertical (`And_rdobtnwlabel_v_dft_*`) aligns radios in a column, ensuring long text wraps cleanly.
- Size suffix `_s`, `_m`, `_l` maps to `ComponentSize.SMALL`, `.MEDIUM`, `.LARGE` which control the indicator diameter, spacing, and typography.

## Supporting Types
### `RadioButtonComponent`
- Accepts additional customization (colors, info/error icons, ID) and manages internal selection state. The wrappers set `scalable = true` and toggle `verticalAlignment` depending on orientation.

### `ComponentSize`
- Shared sizing enum across the library. Pick small for dense lists, medium for standard forms, large for accessibility-first UX.

## Usage Notes
- Pass the same `options` map on every recomposition; because selection lives inside the component, provide a remembered key or reset the composable with `key(options to selected)` if you need to programmatically change the active value.
- To pre-select an option, call `onSelected` from your initialization block or use the base component where you can specify `selectedKey` explicitly.
- Pair `informationText` with validation states: use helper text for guidance and switch to `errorText` when validation fails.
- When you require per-option disablement or secondary descriptions, drop down to `RadioButtonComponent` and build a custom layout around it.
