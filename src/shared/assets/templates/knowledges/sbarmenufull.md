# Package: sidebar

## Imports
```kotlin
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Dashboard
import androidx.compose.material.icons.filled.Folder
import androidx.compose.material3.DrawerValue
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.rememberDrawerState
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import com.nexsoft.component.code.sidebar.And_sbarmenufull_dft
import com.nexsoft.component.base.sidebar.SidebarItem
import com.nexsoft.component.base.sidebar.SidebarSection
import kotlinx.coroutines.launch
```

## Component Overview
- `And_sbarmenufull_dft` renders a full-height modal navigation drawer with a profile header, section titles, nested items, and active-state styling.
- The composable wraps `SidebarComponent`, keeping drawer behavior (open/close) and styling consistent with the design system.

## Quick Start
```kotlin
@Composable
fun AdminScaffold() {
    val drawerState = rememberDrawerState(initialValue = DrawerValue.Closed)
    val scope = rememberCoroutineScope()

    val sections = remember {
        listOf(
            SidebarSection(
                label = "Workspace",
                items = listOf(
                    SidebarItem.Parent(
                        id = "dashboard",
                        label = "Dashboard",
                        icon = Icons.Filled.Dashboard
                    ),
                    SidebarItem.Parent(
                        id = "projects",
                        label = "Projects",
                        icon = Icons.Filled.Folder,
                        children = listOf(
                            SidebarItem.Child("active", "Active"),
                            SidebarItem.Child("archived", "Archived")
                        )
                    )
                )
            )
        )
    }

    And_sbarmenufull_dft(
        sections = sections,
        activeId = "dashboard",
        title = "Nexsoft",
        subtitle = "Operations",
        drawerState = drawerState,
        onItemClick = { item ->
            // navigate or update state here
            scope.launch { drawerState.close() }
        }
    ) {
        Scaffold(topBar = { TopAppBar(title = { Text("Dashboard") }) }) { padding ->
            ScreenContent(Modifier.padding(padding))
        }
    }
}
```
Use `rememberDrawerState` to control the drawer and close it after handling `onItemClick`.

## Parameters
- `sections: List<SidebarSection>` - Hierarchical menu data split into labeled groups. Each section renders its `SidebarItem.Parent` entries (with optional children).
- `activeId: String` - ID of the currently selected item; highlights the parent row and shows the blue indicator.
- `title: String`, `subtitle: String` - Header text beside the avatar at the top of the drawer.
- `drawerState: DrawerState` - Compose Material3 drawer state controlling visibility; share this with your scaffold so gestures and buttons stay in sync.
- `onItemClick: (SidebarItem) -> Unit` - Invoked when a parent without children or any child row is tapped.
- `modifier: Modifier = Modifier` - Apply background, width, or padding overrides to the sidebar content.
- `content: @Composable () -> Unit` - Main-screen content shown to the right of the drawer.

## Supporting Types
### `SidebarSection`
- Immutable data class holding an optional `label` and the list of top-level `SidebarItem.Parent` entries for that group.

### `SidebarItem`
- Sealed interface with two variants:
  - `SidebarItem.Parent(id, label, icon, children?)` - Top-level navigable row; provide a Material icon and optional list of `Child` items.
  - `SidebarItem.Child(id, label)` - Sub-item displayed when the parent is expanded; clicking triggers `onItemClick` with the child.

### Drawer APIs
- Use `rememberDrawerState`/`DrawerValue` and `ModalNavigationDrawer` semantics from Material3. `And_sbarmenufull_dft` handles the `ModalNavigationDrawer` plumbing for you.

## Usage Notes
- Provide stable IDs in `SidebarItem` so `activeId` can be tracked across recompositions.
- Wrap calls to `drawerState.open()`/`close()` in a `rememberCoroutineScope` since the API is suspend-based.
- To display user avatars, pass `AvatarData` via `SidebarComponent` directly; the wrapper keeps the default avatar blank.
- For dynamic menus (e.g., locale changes), recreate the `sections` list so `LazyColumn` diffing picks up label updates.
- Extend functionality (badges, custom colors) by using `SidebarComponent` or `SidebarMenu` from `com.nexsoft.component.base.sidebar` and tailoring the layout manually.
