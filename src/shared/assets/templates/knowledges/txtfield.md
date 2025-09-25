# Package: textfields

## Imports
```kotlin
import com.nexsoft.component.code.textfields.And_txtfield_txtinput_dft_m_plcholder01
import com.nexsoft.component.code.textfields.And_txtfield_pwd_dft_m_plcholder01
import com.nexsoft.component.code.textfields.And_txtfield_date_dft_m_plcholder01
import com.nexsoft.component.code.textfields.And_txtfield_src_dft_m_plcholder01
import com.nexsoft.component.code.textfields.And_txtfield_chatinput_dft_m_plcholder01
import com.nexsoft.component.code.textfields.And_txtfield_updfile_dft_m_plcholder01
```
Add other variants by swapping the suffix (for example _s, _l, _plcholder00).

## Component Overview
The textfields package bundles ready-made wrappers around TextFieldComponent for common use cases:
- Plain text inputs (And_txtfield_txtinput_*): single-line text fields with optional placeholder.
- Password inputs (And_txtfield_pwd_*): toggleable obscured input with eye icon.
- Code and currency fields (And_txtfield_code_*, And_txtfield_codewico_*): add prefixes and optional icons.
- Search fields (And_txtfield_src_*): include search and microphone icons plus trailing actions.
- Chat and audio inputs (And_txtfield_chatinput_*, And_txtfield_audinput_*): provide accessory buttons for attachments, voice recording, and send actions.
- Date and select inputs (And_txtfield_date_*, And_txtfield_selectinput_*): surface dropdown pickers and formatted values.
- Upload helpers (And_txtfield_updfile_*, And_txtfield_updimg_*, And_txtfield_addpic_*): handle progress state and file/image previews.

Sizes _s, _m, _l map to ComponentSize.SMALL, .MEDIUM, .LARGE. Placeholder variants ending in _plcholder00 omit placeholder text, while _plcholder01 accepts a hint string.

## Quick Start
```kotlin
@Composable
fun ProfileForm() {
    var name by rememberSaveable { mutableStateOf("") }
    var password by rememberSaveable { mutableStateOf("") }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        And_txtfield_txtinput_dft_m_plcholder01(
            label = "Full name",
            hint = "John Doe",
            value = name,
            onTextChanged = { name = it }
        )

        And_txtfield_pwd_dft_m_plcholder01(
            label = "Password",
            hint = "Min. 8 characters",
            value = password,
            onTextChanged = { password = it }
        )
    }
}
````
TextFieldComponent handles focus, icons, and error visuals; the wrappers simply configure size, placeholder, and content type for you.

## Key Variants and Parameters
### Plain Text (And_txtfield_txtinput_dft_*)
- label, hint, value, enabled -> standard text field properties.
- onTextChanged -> required callback to propagate user edits.
- Choose _plcholder00 when you do not need placeholder text.

### Password (And_txtfield_pwd_dft_*)
- Same parameters as plain text plus a built-in visibility toggle.
- Uses TextInputType.PASSWORD, so the keyboard and visual transformation update automatically.

### Search (And_txtfield_src_dft_*)
- Exposes trailing and leading icons for search, microphone, filter, and clear actions.
- onSend, onMicClick, onFilterClick, and similar callbacks allow you to wire the buttons without custom layout.

### Date and Select (And_txtfield_date_*, And_txtfield_selectinput_*)
- Adds drop-down affordances via onCalendarClick or onDropdownOptionSelected callbacks.
- Emits a formatted string while you own the actual date picker dialog.

### Chat Input (And_txtfield_chatinput_*)
- Includes attachment, camera, emoji, and send buttons.
- onSend is optional; when supplied the component clears the text after triggering the callback.

### Upload / Add Picture (And_txtfield_updfile_*, And_txtfield_updimg_*, And_txtfield_addpic_*)
- Manage progress with progress: Float and uploadFinished: Boolean flags.
- onChange returns the selected file path or URI; onDetailClick opens a preview.

### Audio Input (And_txtfield_audinput_*)
- Provide onStartRecording, onCancelRecording, onSendRecording, and an optional custom trigger composable.
- The component handles waveform animation and recording state toggles.

### Code and PIN (And_txtfield_code_*, And_txtfield_pin_*)
- code or countryCode prefix is rendered inside the field. Use _codewico_ variants to add trailing icons.
- PIN variants enforce fixed-length digit entry and expose onComplete when the user fills all slots.

## Supporting Types
### TextFieldComponent
- Base composable underpinning all wrappers. It accepts TextInputType (TEXT, PASSWORD, PHONE, DROPDOWN, NUMBER, TEXTAREA), prefix/suffix icons, error state, and country code pickers.

### ComponentSize
- Drives field height, font size, icon size, and padding. All wrappers choose a size automatically based on the suffix.

## Usage Notes
- Always propagate state through value and onTextChanged; the wrappers do not hold internal text.
- If you need validation, combine with TextFieldRuleItem or use the textfieldwithlabel password variants that already show rule lists.
- Many wrappers expect non-empty option lists (for example dropdownOptions, countryCodes). Passing empty lists will disable the pop menus.
- Keep placeholder and label strings concise; the base component trims long text but wide labels may wrap on smaller devices.
- For upload and audio inputs, remember to request runtime permissions (storage, microphone) before triggering the actions.
