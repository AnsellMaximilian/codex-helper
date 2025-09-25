# Package: menuicon

## Imports
```kotlin
import com.nexsoft.component.code.menuicon.And_menuico_dft_s
import com.nexsoft.component.code.menuicon.And_menuico_dft_m
import com.nexsoft.component.code.menuicon.And_menuico_dft_l
import com.nexsoft.component.base.util.theme.ImageSource
```

## Component Overview
- `And_menuico_dft_s`, `_m`, and `_l` render a vertical icon plus label button sized for small, medium, or large touch targets.
- Each variant reacts on press by tinting both icon and label with `MaterialTheme.colorScheme.primary`, making it suitable for dashboard shortcuts or quick-action grids.

## Quick Start
```kotlin
@Composable
fun QuickActions(
    onAction: (String) -> Unit
) {
    Row(horizontalArrangement = Arrangement.spacedBy(32.dp)) {
        And_menuico_dft_s(
            label = "History",
            imageSource = ImageSource.VectorImage(Icons.Default.History),
            onClick = { onAction("history") }
        )
        And_menuico_dft_m(
            label = "Payments",
            imageSource = ImageSource.VectorImage(Icons.Default.AccountBalanceWallet),
            onClick = { onAction("payments") }
        )
        And_menuico_dft_l(
            label = "Support",
            imageSource = ImageSource.VectorImage(Icons.Default.SupportAgent),
            onClick = { onAction("support") }
        )
    }
}
```
Remember to import the icons you reference from `androidx.compose.material.icons.filled` (or your own asset source).

## Parameters
All three variants expose the same arguments and differ only by the internal `ComponentSize` used for icon and text sizing.

- `modifier: Modifier = Modifier` -> Apply padding, width, or click semantics wrappers.
- `iconColor: Color = colorTextSubtlest` -> Default icon tint when idle. Pressed state always uses the theme primary color.
- `textColor: Color = colorTextSubtlest` -> Idle label tint; pressed state switches to the theme primary color.
- `imageSource: ImageSource = ImageSource.VectorImage(Icons.Default.SupervisedUserCircle)` -> Icon payload. See **ImageSource** for supported options.
- `label: String = ""` -> Text rendered underneath the icon. Supply a short noun or verb.
- `onClick: () -> Unit = {}` -> Callback invoked when the user taps the menu tile.

### Size Differences
- `And_menuico_dft_s` -> 24 dp icon, 16 sp label. Use when space is tight.
- `And_menuico_dft_m` -> 32 dp icon, 16 sp label. Balanced option for most shortcut rows.
- `And_menuico_dft_l` -> 52 dp icon, 20 sp label. Ideal for prominent hero actions.

## Supporting Types
### `ImageSource`
- `ImageSource.VectorImage(imageVector: ImageVector)` -> Pass Compose `Icons.*` or your own vector asset.
- `ImageSource.DrawableResource(resId: Int)` -> Reference a drawable resource ID when you prefer XML/vector assets from `res/drawable`.
- `ImageSource.UrlImage(url: String)` -> Load a remote image; ensure your image loader inside the host app supports it.

## Usage Notes
- The component handles ripple-less press feedback by tinting to the primary color. Wrap in your own surface if you need ripples or backgrounds.
- Provide accessible labels: the `label` string is used as the semantics description, so keep it descriptive.
- For grids or rows, combine with `Row`, `LazyVerticalGrid`, or `FlowRow` to control spacing between menu icons.
