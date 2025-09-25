# Package: keyboard

Numeric keypads are exposed via `com.nexsoft.component.code.keyboard`. The wrappers map to the base `Keypad` with preconfigured layouts:
- `And_kbd_custmz_pin` - numeric keypad (digits 0-9, clear, backspace).
- `And_kbd_custmz_pinfp` - numeric keypad with a biometric key.
- `And_kbd_custmz_custmnumber` - increment keypad with +/- shortcuts.

## Getting started
```kotlin
import com.nexsoft.component.code.keyboard.And_kbd_custmz_pin

var pin by remember { mutableStateOf("") }

And_kbd_custmz_pin(
    value = pin,
    onValueChange = { pin = it.take(6) },
    onKeyPress = { key, current, next ->
        if (key is Key.Biometric) showBiometricPrompt()
    }
)
```

### Parameters
- `modifier: Modifier = Modifier` - position the keypad or add padding.
- `value: String? = null` - when `null`, the keypad manages its own state (uncontrolled). Provide a value to control it externally.
- `onValueChange: ((String) -> Unit)? = null` - fired with the new string whenever the keypad mutates the value.
- `onKeyPress: ((Key, String, String?) -> Unit)? = null` - low-level hook for every key press. Receives the `Key`, the current value, and the computed next value (`null` when the key does not mutate the value, e.g., biometric).
- `onBiometric: (() -> Unit)? = null` - convenience callback invoked when the biometric key is pressed (only meaningful for `pinfp`).
- `maxLength: Int = 12` - soft limit for the numeric variants. The increment keypad treats this as a clamp when digits are appended.

### Layout overview
- `KeypadType.Numeric` (used by `And_kbd_custmz_pin`)
  - Rows: digits, `C` (clear), `0`, backspace.
- `KeypadType.NumericWithBiometric` (used by `pinfp`)
  - Replaces the bottom-left `C` with a biometric button.
- `KeypadType.Increment` (used by `custmnumber`)
  - Adds `+1`, `+5`, `-1`, `-5` shortcuts alongside digits.

### Controlled vs uncontrolled
- Leave `value` null to let the component store the current string internally. It will still call `onValueChange` if provided.
- Supply a non-null `value` to control the keypad from parent state. In this mode, update the value inside `onValueChange` and optionally toggle expansion/validation based on `onKeyPress`.

### Tips
- Combine `onKeyPress` with haptics or analytics (e.g., log when the biometric button is tapped).
- Use `key is Key.Digit` inside `onKeyPress` if you need to debounce entry or enforce custom rules beyond `maxLength`.
- `maxLength` applies only to appended digits; custom increments can exceed it if you bypass `onValueChange`. Clamp inside your handler when necessary.
- When using the biometric variant, you typically ignore the string result (`onBiometric` should launch your biometric prompt and update state on success).

### Related base APIs
- `Keypad(type, value, onValueChange, onKeyPress, onBiometric, maxLength)` - the underlying composable with additional hooks.
- `Key` sealed interface - includes `Digit`, `Clear`, `Backspace`, `Biometric`, and `Custom` (used for increment labels).
- `KeypadType` - enum selecting the keypad layout.
