# Package: radio

## Imports
```kotlin
import com.nexsoft.component.code.radio.And_rdobtn_dft_s_label01
import com.nexsoft.component.code.radio.And_rdobtn_dft_m_label01
import com.nexsoft.component.code.radio.And_rdobtn_dft_l_label01
```

## Component Overview
- `And_rdobtn_dft_*_label01` renders a single radio option with scalable hit targets sized for small, medium, or large layouts.
- Each wrapper feeds one entry into `RadioButtonComponent`; compose multiple instances in a column to build a group when you manage selection state yourself.

## Quick Start
```kotlin
@Composable
fun ShippingMethodSelector(
    options: List<Pair<String, String>>,
    selectedValue: String?,
    onValueChange: (String) -> Unit
) {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        options.forEach { (value, label) ->
            val checked = selectedValue == value
            And_rdobtn_dft_m_label01(
                label = label,
                value = value,
                enabled = true,
                onSelected = { chosen -> onValueChange(chosen) }
            )
            if (checked) {
                Text(
                    text = "Selected",
                    style = MaterialTheme.typography.bodySmall,
                    modifier = Modifier.padding(start = 40.dp)
                )
            }
        }
    }
}
```
Remember to hold the currently selected value in state (`rememberSaveable`) or your view-model so recompositions keep the proper option checked.

## Parameters
Shared across all three size variants:
- `label: String` - Text rendered beside the dot.
- `value: String` - Identifier returned through `onSelected` when tapped.
- `enabled: Boolean = true` - Disables pointer input and renders the control in the disabled palette when false.
- `onSelected: (String) -> Unit = {}` - Called with `value` whenever the radio is chosen; use it to update your selection state.

### Size Differences
- `And_rdobtn_dft_s_label01` - Compact spacing (ideal for dense forms).
- `And_rdobtn_dft_m_label01` - Default spacing for most form layouts.
- `And_rdobtn_dft_l_label01` - Larger touch target for accessibility-focused flows.

## Supporting Types
### `ComponentSize`
- Drives the radius of the custom radio indicator and the typography scale. Small/medium/large map to the same sizing system used across the design kit.

### `RadioButtonComponent`
- Underlying base component accepts full option groups, info/error messaging, and color overrides. These wrappers constrain it to a single option and set `scalable = true` so the indicator matches the selected size.

## Usage Notes
- Group radios by placing multiple wrappers in a `Column` and tracking a single `selectedValue`; the component itself stores internal state, so keep it in sync by calling `onSelected` and updating your external state.
- To reset the visual selection from outside, recompose with a different key (e.g., `key(selectedValue)`) or switch to `RadioButtonComponent` so you can manage `options` and `selectedKey` directly.
- Apply `Modifier.fillMaxWidth()` or padding through the `modifier` parameter when you need alignment with surrounding form controls.
