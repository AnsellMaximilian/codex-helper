# Package: buttongroup

Grouped buttons let you present two related actions together with consistent spacing and styling. Import them from `com.nexsoft.component.code.buttongroup`.

## Naming guide
Each function name follows `And_btnGroup_<size>_wicoXY_<orientation>`:
- `<size>`: `s`, `m`, or `l` mapping to `ComponentSize.SMALL`, `MEDIUM`, or `LARGE` inside `ButtonComponent`.
- `wico00`: text-only pair (no icons).
- `wico01`: pair with optional leading icons on both buttons.
- `<orientation>`: `h` for horizontal row, `v` for vertical column.

### Shared API
Every variant exposes the same core parameters:
- `modifier: Modifier = Modifier` - forwarded to each `ButtonComponent`. Apply padding or width constraints here.
- `primaryLabel: String` - caption for the primary button (rendered with `ComponentType.PRIMARY`).
- `secondaryLabel: String` - caption for the secondary button (`ComponentType.SECONDARY`).
- `onPrimaryClick: () -> Unit` and `onSecondaryClick: () -> Unit` - tap handlers for each button.
- `primaryIcon: ImageSource?` and `secondaryIcon: ImageSource?` - available on `wico01` variants only; pass `ImageSource.VectorImage`, `DrawableResource`, or `UrlImage` to prepend icons.

### Orientation differences
- Horizontal variants (`*_h`) place the secondary button first and keep the row compact with an 8 dp gap.
- Vertical variants (`*_v`) expand each button to `fillMaxWidth()` and stack them with 8 dp spacing, primary button on top.

## Horizontal text pair `wico00_h`
Use for dialogs, toolbars, or inline confirmations where both actions should sit side by side.

Example:
```kotlin
And_btnGroup_m_wico00_h(
    primaryLabel = "Save",
    secondaryLabel = "Discard",
    onPrimaryClick = onSave,
    onSecondaryClick = onDiscard,
)
```

## Horizontal text + icon pair `wico01_h`
Adds optional icons to each button. Icons are wired through `ButtonComponent`'s `drawableStart` slot.

Example:
```kotlin
And_btnGroup_s_wico01_h(
    primaryLabel = "Send",
    secondaryLabel = "Schedule",
    primaryIcon = ImageSource.VectorImage(Icons.Default.ChevronRight),
    secondaryIcon = ImageSource.VectorImage(Icons.Default.Add),
)
```

## Vertical stack `wico00_v`
Perfect for bottom sheets or narrow layouts that need full width buttons.

Example:
```kotlin
And_btnGroup_l_wico00_v(
    primaryLabel = "Continue",
    secondaryLabel = "Go back",
    onPrimaryClick = proceed,
    onSecondaryClick = cancel,
)
```

### Behavior notes
- Variants with icons ignore `UrlImage` sources because base `ButtonComponent` does not yet render remote bitmaps. Use drawable or vector assets.
- Primary button color comes from `MaterialTheme.colorScheme.secondary` in this implementation. Make sure your theme defines it for proper contrast.
- Both buttons are enabled by default. To disable a button, wrap the group and call `ButtonComponent` directly, or fork the component.
- For accessibility, provide descriptive labels (e.g., "Save changes") so screen readers communicate intent clearly.
