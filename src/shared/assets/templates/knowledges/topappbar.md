# Package: topbar

## Imports
```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Search
import androidx.compose.runtime.rememberCoroutineScope
import androidx.navigation.compose.rememberNavController
import com.nexsoft.component.code.topbar.And_topappbar_dft_sttdft
import com.nexsoft.component.code.topbar.And_topappbar_src_sttdft
import com.nexsoft.component.base.topbar.TopBarAction
import com.nexsoft.component.util.data.OverflowAction
import kotlinx.coroutines.launch
```

## Component Overview
- `And_topappbar_dft_*` shows a title/subtitle layout with an overflow menu. The suffix `_sttdft`, `_sttotd`, `_sttshdw` toggles baseline, outlined border, or shadow styling.
- `And_topappbar_ico_*` exposes a row of primary icon actions plus an overflow menu.
- `And_topappbar_logo_*` displays a logo with a single trailing action button.
- `And_topappbar_src_*` swaps in a search field with a trailing action icon. All variants delegate to `TopBarComponent` so colors, padding, and navigation handling remain consistent.

## Quick Start
```kotlin
@Composable
fun InventoryTopBar() {
    val navController = rememberNavController()
    val scope = rememberCoroutineScope()

    And_topappbar_dft_sttdft(
        navController = navController,
        title = "Inventory",
        subtitle = "Updated today",
        moreActions = listOf(
            OverflowAction(label = "Refresh") { scope.launch { /* reload */ } }
        )
    )
}
```
`TopBarComponent` already renders a back arrow when the navigation stack is not at the root; ensure your `NavHostController` is wired to the same navigation graph as the body content.

## Parameters
Across all variants you must provide a `NavHostController` from the screen that hosts the top bar. Additional parameters depend on the mode:

### `And_topappbar_dft_*`
- `title: String`, `subtitle: String` - Primary and secondary text.
- `moreActions: List<OverflowAction>` - Items displayed in the overflow menu.

### `And_topappbar_ico_*`
- `actions: List<TopBarAction>` - Row of leading icons with callbacks.
- `moreActions: List<OverflowAction>` - Optional overflow menu items.

### `And_topappbar_logo_*`
- `logo: Int` - Drawable resource for the brand mark.
- `actionIcon: ImageVector` - Trailing button icon.
- `onAction: () -> Unit` - Callback when the trailing button is tapped.

### `And_topappbar_src_*`
- `searchValue: String` - Current text inside the search field.
- `actionIcon: ImageVector` - Icon to display inside the trailing button (for example a cart or filter).
- `onAction: () -> Unit = {}` - Optional trailing button callback.
- `onSearch: (String) -> Unit = {}` - Called whenever the user updates the search text.

### Style suffixes
- `_sttdft` - Default surface.
- `_sttotd` - Adds a 1 dp outline along the bottom edge.
- `_sttshdw` - Applies Material elevation shadow.

## Supporting Types
### `TopBarAction`
- `icon: ImageVector`, `onClick: () -> Unit` - Simple icon actions rendered inline.

### `OverflowAction`
- `label: String`, `onClick: () -> Unit`, `leadingIcon: ImageVector?`, `enabled: Boolean` - Data model for overflow menu items.

### `TopBarComponent`
- Base component supporting more advanced options: custom container color, border color, height, and content slot. Use it directly when you need bespoke layouts.

## Usage Notes
- Keep action lists short; overflow menu is ideal for secondary actions to avoid crowding the bar.
- Supply a stable `NavHostController` tied to your screen; creating a new controller per recomposition breaks back navigation.
- For search mode, debounce the `onSearch` callback in your view-model if you issue network requests on every change.
- Combine shadow and outline variants sparingly; use them to match the surface treatment of the surrounding scaffold.
- Provide accessible labels for overflow actions and icons (for example via `OverflowAction.leadingIcon`) when actions are not obvious.
