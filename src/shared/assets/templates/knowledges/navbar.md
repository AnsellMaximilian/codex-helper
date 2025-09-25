# Package: navbar

## Imports
```kotlin
import androidx.navigation.compose.rememberNavController
import com.nexsoft.component.code.navbar.And_navbar_3menu_dft
import com.nexsoft.component.code.navbar.And_navbar_4menuwcta_shdw
import com.nexsoft.component.base.navbar.NavbarCenterAction
import com.nexsoft.component.base.navbar.NavbarRouteItem
```
Add other variants from `com.nexsoft.component.code.navbar.*` as needed.

## Component Overview
- The `And_navbar_*` family renders Material 3 bottom navigation bars wired to a `NavHostController`.
- Variants differ by item count (2, 3, 4, or 5 tabs) and visual treatment: `dft` (plain), `otd` (adds a top border), `shdw` (adds elevation shadow).
- `*menuwcta` versions introduce a floating center call-to-action that sits above the bar while keeping left/right navigation items balanced.

## Quick Start
```kotlin
@Composable
fun HomeScaffold() {
    val navController = rememberNavController()
    val navItems = listOf(
        NavbarRouteItem(route = "home", icon = Icons.Default.Home, label = "Home"),
        NavbarRouteItem(route = "orders", icon = Icons.Default.List, label = "Orders"),
        NavbarRouteItem(route = "account", icon = Icons.Default.Person, label = "Account")
    )

    Scaffold(
        bottomBar = {
            And_navbar_3menu_dft(
                navController = navController,
                items = navItems
            )
        }
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = "home",
            modifier = Modifier.padding(padding)
        ) {
            composable("home") { /* ... */ }
            composable("orders") { /* ... */ }
            composable("account") { /* ... */ }
        }
    }
}
```
To add a center CTA, switch to one of the `*menuwcta` functions and supply a `NavbarCenterAction`.

## Parameters by Variant
Every function shares the same required controller and item list. The expected length of `items` is enforced by `require(...)` inside each function.

### Common Parameters
- `navController: NavHostController` -> The controller must drive a `NavHost`; navigation item clicks call `navigate(item.route)` with `popUpTo` on the start destination.
- `items: List<NavbarRouteItem>` -> Tab definitions. Provide exactly the count required for the variant; routes must exist in your graph.
- `center: NavbarCenterAction` -> Only for `*_menuwcta` variants. Supplies the icon, label, and click handler for the raised center button.

### Visual Styles
- `*_dft` -> Baseline container with no border or shadow.
- `*_otd` -> Adds a 1 dp border line across the top edge.
- `*_shdw` -> Adds a Material elevation shadow beneath the bar.

### Item Count Expectations
- `And_navbar_2menuwcta_*` -> `items.size` must be 2. Items are split left/right around the center CTA.
- `And_navbar_3menu_*` -> `items.size` must be 3.
- `And_navbar_4menu_*` -> `items.size` must be 4.
- `And_navbar_4menuwcta_*` -> `items.size` must be 4; two items render per side of the center CTA.
- `And_navbar_5menu_*` -> `items.size` must be 5.

## Supporting Types
### `NavbarRouteItem`
- `route: String` -> Destination route passed to `NavHostController.navigate`.
- `icon: ImageVector` -> Icon shown above the label in each navigation item.
- `label: String` -> Text label displayed under the icon.

### `NavbarCenterAction`
- `icon: ImageVector` -> Icon rendered inside the floating center button.
- `label: String` -> Text rendered in the placeholder slot inside the bar to keep layout balanced.
- `onClick: () -> Unit` -> Handler for taps on the raised button.

### Behavior Notes
- Selection is derived from the controller's current back stack entry; matching routes appear active and tint to `MaterialTheme.colorScheme.primary`.
- Navigation is state-saving: repeated taps use `launchSingleTop` and `restoreState = true` so previously visited destinations retain state.
- `center` buttons are visually elevated and should map to a primary action (e.g., create, scan, pay).

## Usage Notes
- Ensure your `NavHost` defines destinations for every `NavbarRouteItem.route`; otherwise navigation will throw an exception.
- If you need more than five items, prefer hierarchical navigation (e.g., menus inside tabs) rather than extending the bar.
- When using `*_menuwcta` variants, keep the CTA label short so it fits inside the placeholder text below the floating button.
- Icons come from `androidx.compose.material.icons` (filled/outlined) or any `ImageVector`; supply your own set to match branding.
