# Package: buttonicon

Icon buttons are available from `com.nexsoft.component.code.buttonicon`. They wrap `ButtonIconComponent` to give you consistent sizing, color tokens, and press states across primary, secondary, tertiary, and default styles.

## Naming guide
`And_btnIcon_dft_<size>_<shape>_<variant>` breaks down into:
- `<size>`: `s`, `m`, or `l` for `ComponentSize.SMALL`, `MEDIUM`, or `LARGE` (32 dp, 40 dp, 48 dp).
- `<shape>`: `rnd` keeps the 8 dp rounded square, `crc` makes the container fully circular.
- `<variant>`: `01` primary, `02` secondary, `03` tertiary, `04` default. These map directly to `ComponentType.PRIMARY`, `SECONDARY`, `TERTIARY`, and `DEFAULT` in the base component.

## Shared API
All variants expose the same surface:

- Signature: `@Composable fun And_btnIcon_dft_<size>_<shape>_<variant>(modifier: Modifier = Modifier, isEnabled: Boolean = true, onClick: () -> Unit = {})`
- `modifier` lets you position the button (padding, alignment, semantics). The button reports its own size, so you generally do not supply width or height.
- `isEnabled` toggles visual state and clickability. Disabled buttons dim the icon tint and background per the design tokens.
- `onClick` fires when the user taps the button.

### Choosing a variant
- Primary (`*_01`) fills the surface with `MaterialTheme.colorScheme.primary` and inverts the icon color for contrast.
- Secondary (`*_02`) renders a white background with a colored stroke, ideal for low-emphasis actions on tinted backgrounds.
- Tertiary (`*_03`) is borderless on white and relies on the accent color icon.
- Default (`*_04`) applies elevation and neutral coloring suitable for floating action toggles.

### Shape differences
- Use `rnd` to match other square controls (toolbars, input adornments).
- Use `crc` when you need a circular affordance (floating shortcuts, map controls).

## Usage examples
```kotlin
import com.nexsoft.component.code.buttonicon.And_btnIcon_dft_m_crc_01

And_btnIcon_dft_m_crc_01(
    isEnabled = state.canAdd,
    onClick = { viewModel.onAddItem() }
)
```

```kotlin
import com.nexsoft.component.code.buttonicon.And_btnIcon_dft_s_rnd_02

And_btnIcon_dft_s_rnd_02(
    modifier = Modifier.padding(end = 8.dp),
    onClick = { showSecondarySheet() }
)
```

### Behavior notes
- Each wrapper currently uses `Icons.Default.Add`. To change the glyph, fork the component or call `ButtonIconComponent` directly with your own `icon` parameter.
- The base component exposes additional knobs (`componentColor`, `useDpSize`, etc.). If you need them, drop down to `ButtonIconComponent`.
- Ripple feedback and semantics are already wired. Avoid wrapping the button in another clickable container to keep accessibility hints intact.
