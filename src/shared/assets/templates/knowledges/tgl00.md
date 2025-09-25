# Package: toggle

## Imports
```kotlin
import com.nexsoft.component.code.toggle.And_tgl00_s_label01
import com.nexsoft.component.code.toggle.And_tgl00_m_label01
import com.nexsoft.component.code.toggle.And_tgl00_l_label01
```

## Component Overview
- `And_tgl00_*_label01` renders a switch with an inline label, sized for small, medium, or large touch targets.
- The wrappers call `ToggleComponent`, which provides accessible semantics, disabled styling, and thumb/track animation.

## Quick Start
```kotlin
@Composable
fun NotificationsToggle() {
    var enabled by rememberSaveable { mutableStateOf(true) }

    And_tgl00_m_label01(
        isChecked = enabled,
        onCheckedChange = { enabled = it },
        label = "Send me updates"
    )
}
```
Hold the `isChecked` value in state (for example with `rememberSaveable`) so the toggle reflects user interaction after recomposition.

## Parameters
- `isChecked: Boolean` -> Current switch position (`true` = on).
- `onCheckedChange: (Boolean) -> Unit` -> Callback invoked with the new value when the user taps the control.
- `label: String` -> Text displayed to the right of the switch.
- `enabled: Boolean = true` -> Disables interaction and swaps to muted colors when false.

### Size Differences
- `And_tgl00_s_label01` -> Compact switch suitable for dense lists.
- `And_tgl00_m_label01` -> Default size for most forms.
- `And_tgl00_l_label01` -> Larger control optimised for accessibility or prominent settings.

## Supporting Types
### `ToggleComponent`
- Base composable accepting extra knobs such as `onColor`, `offColor`, `thumbColor`, and optional info/error text.
- Use it directly when you need custom title placement, helper text, or alternative styling.

### `ComponentSize`
- Shared enum that drives switch dimensions and typography. Sizes map to the small/medium/large wrappers above.

## Usage Notes
- Wrap the toggle in a row or surface with adequate padding; the component itself only applies minimal spacing.
- Provide descriptive labels so the control is clear for screen readers. The label parameter is part of the touch target.
- For read-only displays, set `enabled = false` but still render the state so users know the current configuration.
- If the toggle triggers heavy work (network calls), debounce or disable it temporarily while the operation completes.
