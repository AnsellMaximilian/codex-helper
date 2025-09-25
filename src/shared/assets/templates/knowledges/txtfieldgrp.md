# Package: textfieldgroup

## Imports
```kotlin
import com.nexsoft.component.code.textfieldgroup.And_txtfieldgrp_input2row_m
import com.nexsoft.component.code.textfieldgroup.And_txtfieldgrp_chat_m
import com.nexsoft.component.code.textfieldgroup.And_txtfieldgrp_addpic_m
import com.nexsoft.component.code.textfieldgroup.And_txtfieldgrp_pin4row_l
```

## Component Overview
Grouped text field wrappers help you compose multi-input layouts without manual spacing:
- `input2row`, `input3row`, `input4row` -> stacked `TextFieldComponent` instances with shared enable state and callbacks.
- `chat` -> chat composer with attachment, camera, emoji, and send actions plus an expandable text area.
- `addpic` -> horizontal photo picker that surfaces selected thumbnails.
- `check` -> text field paired with a button (for example resend OTP or check availability).
- `pin4row` / `pin6row` -> fixed-length PIN entry groups that emit `onComplete` when all digits are entered.

Each variant comes in `_s`, `_m`, `_l` sizes, mapping to `ComponentSize.SMALL`, `.MEDIUM`, `.LARGE` for consistent height and typography.

## Quick Start
```kotlin
@Composable
fun AddressBlock() {
    var street by rememberSaveable { mutableStateOf("") }
    var city by rememberSaveable { mutableStateOf("") }

    And_txtfieldgrp_input2row_m(
        value1 = street,
        onValue1Change = { street = it },
        value2 = city,
        onValue2Change = { city = it }
    )
}
```
The group simply forwards state changes; validation and error display are up to the caller.

## Key Variants
### `And_txtfieldgrp_input2row_*`, `input3row_*`, `input4row_*`
- Provide `valueN` and `onValueNChange` for each field.
- Set `enabled = false` to disable the entire row.
- Combine with `modifier` if you need padding or width constraints.

### `And_txtfieldgrp_chat_*`
- Parameters mirror the single chat input component (`value`, `onValueChange`, `placeholder`).
- `onAttachClick`, `onCameraClick`, `onEmojiClick`, `onSend` expose the trailing buttons.
- Internally uses a larger text area when the content wraps.

### `And_txtfieldgrp_addpic_*`
- `onChange: (List<Uri>) -> Unit` receives updated selections.
- Pass `enabled = false` to hide the add tile while keeping previews visible.

### `And_txtfieldgrp_chk_*`
- Combines a text field with an action button (for example ->Check-> or ->Send code->).
- `buttonLabel` and `onClick` configure the trailing button behavior.

### `And_txtfieldgrp_pin4row_*`, `pin6row_*`
- `hide: Boolean` toggles obscured digits.
- `onComplete` fires once the user fills all boxes; clear your own state to reset.

## Supporting Types
All variants are powered by `TextFieldComponent` under the hood, so you get the same styling, semantics, and component size handling as other text fields.

## Usage Notes
- Treat grouped components as controlled inputs: manage `value` state outside and pass fresh strings on recomposition.
- For chat and audio flows, debounce send/camera callbacks if they trigger expensive work.
- `addpic` and upload groups rely on Android activity result APIs; ensure the host screen handles permission prompts and file cleanup.
- PIN groups automatically focus successive boxes; call `onComplete` to advance flows (for example verify OTP).
- When combining multiple groups in a form, keep consistent size suffixes (`_m` by default) for aligned heights.
