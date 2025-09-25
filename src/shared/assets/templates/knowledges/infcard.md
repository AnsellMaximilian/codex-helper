# Package: informationcard

Information cards live in `com.nexsoft.component.code.informationcard`. They surface status messaging with optional action buttons. Variants differ by iconography and colour tokens:
- `And_infcard_inf` - neutral informational state.
- `And_infcard_warn` - warning state.
- `And_infcard_err` - error state.
- `And_infcard_sucs` - success state.

Each variant shares the same parameters and delegates to the base `InformationCardComponent` with preconfigured icons, colours, and button types.

## Usage
```kotlin
import com.nexsoft.component.code.informationcard.And_infcard_warn

And_infcard_warn(
    title = "Incomplete profile",
    description = "Add your tax ID to continue checkout",
    buttonLabel = "Update now",
    onSubmit = { navController.navigate("/profile") },
    onClose = { viewModel.dismissBanner() }
)
```

### Parameters
- `modifier: Modifier = Modifier` - apply padding, width constraints, etc.
- `title: String = ""` - headline text (bold by default). Optional but recommended.
- `description: String = ""` - supporting copy.
- `buttonLabel: String = ""` - label for the CTA button. If blank, the button is still rendered but empty; provide a value or drop to the base component if no CTA is needed.
- `onClose: () -> Unit = {}` - invoked when the close icon is pressed. Dismiss the banner inside this callback.
- `onSubmit: () -> Unit = {}` - called when the CTA button is tapped.

### Behaviour
- Cards stretch to `fillMaxWidth()` and use tonal backgrounds matching the variant (info, warning, error, success).
- Close button is always shown (top right). Leave `onClose` empty if you simply want it to do nothing.
- Buttons use `ComponentType.TERTIARY` (text-style) for info/success, and variant-appropriate colours for warn/error.

### Tips
- Keep copy concise; the description is a single paragraph. Long messages should wrap but consider truncation in smaller layouts.
- If you need secondary actions or different button hierarchy, use `InformationCardComponent` directly where you can supply custom composables.
- Manage one-time banners via state hoisted in a view model (e.g., `rememberSaveable { mutableStateOf(true) }`).

### Related base APIs
- `InformationCardComponent(...)` - accepts custom icons, colours, typography, and button slots.
- `InformationCardType` - enum controlling iconography and semantics.
