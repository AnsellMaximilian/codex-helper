# Package: checkbox

Basic checkboxes live in `com.nexsoft.component.code.checkbox`. They wrap the base `CheckboxOption` and scale typography/size for you. Each function name encodes the size (`s`, `m`, `l`) and currently only the `label01` variant exists.

## Getting started
```kotlin
import com.nexsoft.component.code.checkbox.And_chb_dft_m_label01

var checked by remember { mutableStateOf(false) }
And_chb_dft_m_label01(
    isChecked = checked,
    label = "Receive updates",
    onCheckedChange = { checked = it }
)
```

### Parameters
- `isChecked: Boolean` - your state source of truth. Update it in `onCheckedChange`.
- `label: String` - text rendered to the right of the checkbox. The component provides spacing and typography for the chosen size.
- `onCheckedChange: (Boolean) -> Unit` - invoked whenever the user taps the option. Remember the component does not mutate `isChecked` on its own.
- `modifier: Modifier` - optional additional styling (padding, semantics, etc.).
- `enabled: Boolean = true` - disables interaction and renders the checkbox using the design-system disabled colours when false.

### Sizes
- `And_chb_dft_s_label01` -> `ComponentSize.SMALL` (compact lists, dense forms).
- `And_chb_dft_m_label01` -> `ComponentSize.MEDIUM` (default for forms).
- `And_chb_dft_l_label01` -> `ComponentSize.LARGE` (touch-friendly CTAs, marketing panes).

Under the hood the wrapper calls `getCheckSize(ComponentSize)` and `getCheckFontSize(ComponentSize)` so both the box and label scale together.

### Behaviour tips
- Use `modifier.semantics` if you need custom accessibility descriptions (e.g., for dynamic counts).
- Place the composable inside a `Row` with `clickable` if you want the entire row to toggle the checkbox (remember to forward `enabled`).
- For validation, run logic in `onCheckedChange` rather than relying on built-in error states (plain checkboxes intentionally omit helper text).

### Related helpers
If you need helper/error text, legends, or multiple options in one component, see the checkbox-with-label variants documented in `chbwlabel.md`.
