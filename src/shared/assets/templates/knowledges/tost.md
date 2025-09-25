# Package: toast

## Imports
```kotlin
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.remember
import androidx.compose.ui.unit.dp
import com.nexsoft.component.code.toast.And_tost_err
import com.nexsoft.component.code.toast.And_tost_inf
import com.nexsoft.component.code.toast.And_tost_prgs
import com.nexsoft.component.code.toast.And_tost_sucs
import com.nexsoft.component.code.toast.And_tost_warn
```

## Component Overview
- `And_tost_err`, `And_tost_inf`, `And_tost_warn`, and `And_tost_sucs` display error, info, warning, and success toasts respectively.
- `And_tost_prgs` adds a progress bar and percentage label for long-running operations; it uses the default toast styling.
- All wrappers call `ToastComponent`, which animates entry and exit, draws the colored accent, and wires the close button.

## Quick Start
```kotlin
@Composable
fun ToastExamples() {
    Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
        And_tost_sucs(
            title = "Saved",
            description = "Your profile changes are live.",
            onClose = { /* dismiss */ }
        )

        And_tost_prgs(
            title = "Uploading",
            description = "Syncing assets...",
            progress = 0.45f
        )
    }
}
```
Toasts are self-contained cards; place them inside a host column or overlay and manage their lifetime in your own state.

## Parameters
Shared across all variants:
- `title: String` - Headline displayed in bold.
- `description: String` - Supporting message.
- `onClose: () -> Unit = {}` - Invoked when the user taps the close icon.

Additional parameter for `And_tost_prgs`:
- `progress: Float` - Value from 0f to 1f shown in the progress bar and percentage label. The component clamps values outside this range.

## Supporting Types
### `ToastComponent`
- Base composable with options for `type`, `showProgress`, `progress`, and custom colors. Use it directly when you need bespoke icons or to stack multiple actions.

### `ToastType`
- Enum (`DEFAULT`, `SUCCESS`, `WARNING`, `ERROR`, `INFO`) that drives iconography, colors, and accent borders.

## Usage Notes
- Manage visibility yourself; the wrapper keeps internal state to handle the dismissal animation but does not schedule auto-dismiss. Remove the composable from the tree after `onClose` fires.
- Keep descriptions short (one or two sentences) to avoid overflowing the toast card.
- For progress toasts, update the `progress` value via state and switch to a success or error toast once the operation completes.
- When stacking multiple toasts, add vertical spacing (for example `Spacer` or `Arrangement.spacedBy`) to prevent overlap.
- All toasts use Material theme colors; override by calling `ToastComponent` with a different `type` or custom background settings if needed.
