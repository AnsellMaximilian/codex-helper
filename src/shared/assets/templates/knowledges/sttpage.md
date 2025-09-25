# Package: statepage

## Imports
```kotlin
import com.nexsoft.component.code.statepage.And_sttpage_empt
import com.nexsoft.component.code.statepage.And_sttpage_hero
```

## Component Overview
- `And_sttpage_empt` shows the standard empty-state illustration, headline, description, and a primary call-to-action button.
- `And_sttpage_hero` swaps in a hero illustration to celebrate positive states (success, onboarding completion, etc.).
- Both wrappers render full-screen layouts via `StatePgaeComponent`, centring the artwork and copy to keep messaging consistent across flows.

## Quick Start
```kotlin
@Composable
fun EmptyOrdersScreen(onBrowse: () -> Unit) {
    And_sttpage_empt(
        title = "No orders yet",
        description = "Browse the catalogue to place your first order.",
        onClick = onBrowse
    )
}
```
Place the component directly inside your screen scaffold; it uses `Modifier.fillMaxSize()` to centre content within the available space.

## Parameters
- `title: String`  Bold headline displayed beneath the illustration.
- `description: String`  Supporting copy rendered in body style and centred alignment. Keep text concise to avoid overflow.
- `onClick: () -> Unit = {}`  Primary button handler (label defaults to Button). Use it to drive navigation or retries.

### Variant Artwork
- `And_sttpage_empt`  Uses `R.drawable.default_empty_image` as the illustration.
- `And_sttpage_hero`  Uses `R.drawable.default_hero_image` for celebratory states.
If you need custom artwork, call `StatePgaeComponent` directly and provide your own `ImageSource`.

## Supporting Types
### `StatePgaeComponent`
- Base composable exposed under `com.nexsoft.component.base.statepage`. Accepts `imageSource`, `modifier`, and the same title/description/onClick parameters. Use it when you need to:
  - Provide bespoke illustrations (`ImageSource.VectorImage`, `DrawableResource`, or `UrlImage`).
  - Adjust button label/size by replacing the embedded `ButtonComponent`.
  - Override spacing or typography by wrapping with your own layout.

### `ImageSource`
- Shared sealed class for image payloads. The wrappers stick to drawable resources, but the base component supports vectors and remote URLs.

## Usage Notes
- Surround the component with appropriate padding if you need breathing room around the edges; the default implementation uses `Modifier.fillMaxSize().padding(8.dp)`.
- Pair the primary buttons action with an analytics event if you need to track user recovery attempts from empty or error states.
- When localising copy, keep title lengths short to avoid wrapping beneath the illustration; adjust typography by calling the base component if translations run long.
- To hide the action button entirely (e.g., purely informational state), drop down to `StatePgaeComponent` and replace the embedded `ButtonComponent` with your own layout.
