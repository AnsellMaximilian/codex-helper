# Package: textfieldwithlabel

## Imports
```kotlin
import com.nexsoft.component.code.textfieldwithlabel.And_txtfieldwlabel_inputtxt_dft_m
import com.nexsoft.component.code.textfieldwithlabel.And_txtfieldwlabel_pwd_dft_m
import com.nexsoft.component.base.textfieldwithlabel.TextFieldRuleItem
```

## Component Overview
These wrappers combine the base text field with stacked labels, helper text, and optional password rules:
- `And_txtfieldwlabel_inputtxt_dft_*` -> plain text input with bold title above the field and optional helper line.
- `And_txtfieldwlabel_pwd_dft_*` -> password entry that lists validation rules and visually marks each rule as the user types.

The `_s`, `_m`, `_l` suffix selects `ComponentSize` (small, medium, large) to match surrounding form elements.

## Quick Start
```kotlin
@Composable
fun AccountSettings() {
    var email by rememberSaveable { mutableStateOf("") }
    var password by rememberSaveable { mutableStateOf("") }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        And_txtfieldwlabel_inputtxt_dft_m(
            label = "Email",
            hint = "name@example.com",
            value = email,
            informationText = "Used for account recovery",
            onTextChanged = { email = it }
        )

        And_txtfieldwlabel_pwd_dft_m(
            label = "Password",
            hint = "At least 8 characters",
            value = password,
            rules = listOf(
                TextFieldRuleItem({ it.length >= 8 }, "Minimum 8 characters"),
                TextFieldRuleItem({ it.any(Char::isDigit) }, "Contains a number")
            ),
            onTextChanged = { password = it }
        )
    }
}
```
`TextFieldComponent` powers the input areas; the wrapper adds titles, helper text, and rule validation visuals.

## Parameters
### `And_txtfieldwlabel_inputtxt_dft_*`
- `label: String` -> Title above the field.
- `hint: String` -> Placeholder text shown inside the field.
- `value: String` and `onTextChanged: (String) -> Unit` -> Controlled state for the input.
- `informationText: String?` -> Optional helper copy displayed beneath the field.
- `enabled: Boolean = true`, `error: Boolean = false` -> Toggle disabled state or error styling.

### `And_txtfieldwlabel_pwd_dft_*`
- Same parameters as the plain text variant plus:
  - `rules: List<TextFieldRuleItem>` -> Each rule specifies a predicate and message; the wrapper shows a check or cross icon per rule.
  - Uses `TextInputType.PASSWORD`, so the field includes a visibility toggle.

## Supporting Types
### `TextFieldRuleItem`
- `rule: (String) -> Boolean`, `message: String` -> Supply for password complexity rules. The wrapper re-evaluates rules whenever `value` changes.

### `TextFieldComponent`
- Underlying input control with support for icons, size, error state, and keyboard configuration. Access it directly if you need custom layouts beyond the supplied label stack.

## Usage Notes
- Keep helper and rule messages short so they do not wrap across multiple lines; this maintains consistent form height.
- When `error = true`, the helper line switches to danger colors. Use this to surface validation failures alongside the rule list.
- Password rules evaluate client-side only; ensure you perform final validation before submitting to your backend.
- For accessibility, pass descriptive `label` text (for example "Account password") so screen readers announce the field context clearly.
