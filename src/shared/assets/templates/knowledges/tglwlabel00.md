# Package: togglewithlabel

## Imports
```kotlin
import com.nexsoft.component.code.togglewithlabel.And_tglwlabel00_dft_s
import com.nexsoft.component.code.togglewithlabel.And_tglwlabel00_dft_m
import com.nexsoft.component.code.togglewithlabel.And_tglwlabel00_dft_l
```

## Component Overview
- `And_tglwlabel00_dft_*` renders a switch paired with a stacked title and helper text (information/error), making it suitable for settings forms.
- The wrappers call `ToggleComponent` with `title`, `toggleTitle`, and optional helper strings, so you get consistent spacing and styling for form fields.

## Quick Start
```kotlin
@Composable
fun DarkModeSetting() {
    var enabled by rememberSaveable { mutableStateOf(false) }

    And_tglwlabel00_dft_m(
        isChecked = enabled,
        onCheckedChange = { enabled = it },
        toggleLabel = "Dark mode",
        label = "Appearance",
        informationText = "Applies to this device only"
    )
}
```
The title (`label`) sits above the switch; `toggleLabel` is shown inline next to the control.

## Parameters
Shared across `_s`, `_m`, `_l` suffixes (mapping to `ComponentSize.SMALL`, `.MEDIUM`, `.LARGE`):
- `isChecked: Boolean` - Current switch state.
- `onCheckedChange: (Boolean) -> Unit` - Callback with the new state when toggled.
- `toggleLabel: String` - Text next to the switch thumb.
- `label: String` - Title above the switch.
- `informationText: String = ""` - Optional helper message rendered below in neutral style.
- `errorText: String = ""` - Optional error message shown in the error color beneath the helper.
- `enabled: Boolean = true` - Disables interaction and uses muted colors when false.

## Supporting Types
### `ToggleComponent`
- Base composable that exposes additional hooks: custom colors (`onColor`, `offColor`, `thumbColor`), icons for helper/error messages, and ID-based semantics.
- Use it directly if you need granular control over content layout or want to hide the inline label entirely.

### `ComponentSize`
- Dictates control height, thumb diameter, and text sizing. Pick the size that matches surrounding form controls.

## Usage Notes
- Keep helper and error text concise; both render beneath the control without extra spacing tweaks.
- Only provide `errorText` when there is a validation issue; the component displays helper text first, then error text if present.
- For accessibility, ensure the combination of `label` and `toggleLabel` clearly describes what the control does.
- When placing toggles in a scrolling form, prefer the medium or large size so touch targets remain finger-friendly.
