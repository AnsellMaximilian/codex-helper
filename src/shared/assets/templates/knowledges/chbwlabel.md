# Package: checkboxwithlabel

These components expose grouped checkbox lists with titles, helper text, and validation states. Import them from `com.nexsoft.component.code.checkboxwithlabel`. Two layouts are available:
- `And_chbwlabel_h_dft_*` - horizontal layout (checkboxes in a row).
- `And_chbwlabel_v_dft_*` - vertical layout (checkboxes stacked). *(Vertical wrappers share the same signature but set `verticalAlignment = true` internally.)*

## Getting started
```kotlin
import com.nexsoft.component.code.checkboxwithlabel.And_chbwlabel_h_dft_m

val options = remember { mutableStateMapOf(
    "Email" to true,
    "SMS" to false,
    "Push" to false,
) }

And_chbwlabel_h_dft_m(
    label = "Notify me via",
    options = options,
    informationText = "Choose all that apply",
    onCheckedChange = { updated -> options.putAll(updated) }
)
```

### Parameters
- `label: String` - title displayed above the bucket of checkboxes.
- `options: MutableMap<String, Boolean>` - backing map of option labels to checked state. The component mutates this map and passes a snapshot to `onCheckedChange` each time a box is toggled. Use `mutableStateMapOf` so Compose observes changes.
- `enabled: Boolean = true` - disables all child checkboxes when false.
- `informationText: String = ""` - helper copy beneath the options. Provide when you want to explain what the choices mean.
- `errorText: String = ""` - validation message rendered in the error colour. Leave blank to hide.
- `onCheckedChange: (Map<String, Boolean>) -> Unit` - receives the updated map after every interaction. Typically you call `options.putAll(updated)` to sync your state.

### Size variants
Suffix `_s`, `_m`, `_l` match `ComponentSize.SMALL`, `MEDIUM`, and `LARGE`. They scale both checkbox and typography. Use:
- `_s` for dense UIs or secondary filters.
- `_m` for standard form usage (recommended default).
- `_l` for touch-heavy flows where accessibility spacing is critical.

### Layout difference
- `And_chbwlabel_h_dft_*` lays options side by side, ideal for two or three short labels.
- `And_chbwlabel_v_dft_*` stacks options vertically. Use when labels are long or when you have more than three entries.

### Icons
The wrapper supplies default info and warning icons via `ImageSource.VectorImage(Icons.Outlined.Info)` and `ImageSource.DrawableResource(R.drawable.ic_warning_component)`. To customise, drop down to `CheckboxComponent` in the base package.

### Validation patterns
- Keep `options` in sync with business rules within `onCheckedChange`. For example, to enforce a single selection you can rewrite every entry before calling `options.putAll(...)`.
- When you provide `errorText`, you can flip it to an empty string once the state is valid.
- `CheckboxComponent` exposes `defaultValidation` if you want automatic "at least one" checks; the wrappers leave this off so you control the rule.

### Tips
- Use `remember { mutableStateMapOf(...) }` - a regular `mutableMapOf` will not trigger recomposition.
- `informationText` and `errorText` can be shown simultaneously. Ensure copy explains which rule failed.
- If you need icons or CTA buttons per row, pair the base `CheckboxOption` with a custom layout instead of the grouped component.

### Related base APIs
- `CheckboxOption` (single checkbox with label).
- `CheckboxComponent` (the grouped implementation used here).
- `getCheckSize/getCheckFontSize` if you need to mirror sizing in custom layouts.
