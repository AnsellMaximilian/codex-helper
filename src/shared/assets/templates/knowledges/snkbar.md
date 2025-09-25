# Package: snackbar

## Imports
```kotlin
import androidx.compose.material3.SnackbarData
import androidx.compose.material3.SnackbarHost
import androidx.compose.material3.SnackbarHostState
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import com.nexsoft.component.code.snackbar.And_snkbar_dft
```

## Component Overview
- `And_snkbar_dft` is a drop-in snackbar host composable that renders the message, optional action label, and a success icon using the design-system surface.
- It delegates to `SnackbarComponent`, so theming (shape, elevation, colors) stays consistent across all snackbars in the app.

## Quick Start
```kotlin
@Composable
fun SnackbarDemo() {
    val hostState = remember { SnackbarHostState() }

    LaunchedEffect(Unit) {
        hostState.showSnackbar(
            message = "Profile updated",
            actionLabel = "Undo"
        )
    }

    SnackbarHost(hostState = hostState) { data ->
        And_snkbar_dft(data = data)
    }
}
```
Send messages through `SnackbarHostState` as usual; the host passes each `SnackbarData` instance down to `And_snkbar_dft` for styling.

## Parameters
- `data: SnackbarData` - Material3 snackbar payload providing the `message`, optional `actionLabel`, and callbacks such as `performAction()` when the action text is tapped.

## Supporting Types
### `SnackbarComponent`
- Base implementation powering the wrapper. Accepts an optional `icon: ImageSource` parameter (defaults to `Icons.Default.CheckCircle`). Call `SnackbarComponent` directly if you want to customize the icon or colors.

### `ImageSource`
- Sealed class recognised across the component library. Supply a vector, drawable resource, or URL image when overriding the icon through the base component.

## Usage Notes
- Call `data.performAction()` in response to action taps; the wrapper already wires the label's `Modifier.clickable` to this method.
- Because the surface fills the available width minus host padding, adjust the host's `Modifier.padding` to position the snackbar (bottom, floating, etc.).
- Use different host states for independent regions (e.g., bottom sheet vs. full screen) to avoid message collisions.
- For destructive alerts or warning styles, create a custom wrapper around `SnackbarComponent` that swaps the icon/Surface colors.
