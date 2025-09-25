# Package: tabgroup

## Imports
```kotlin
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.List
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.rememberSaveable
import com.nexsoft.component.code.tabgroup.And_tabgroup_2tab
import com.nexsoft.component.code.tabgroup.And_tabgroup_3tab
import com.nexsoft.component.code.tabgroup.And_tabgroup_scrltab
import com.nexsoft.component.base.tabs.TabData
```

## Component Overview
- `And_tabgroup_2tab` and `And_tabgroup_3tab` create fixed-width tab rows for two or three tabs respectively.
- `And_tabgroup_scrltab` supports any number of tabs with a horizontally scrollable row.
- All variants wrap `TabsComponent`, which handles icons, disabled states, and the selected indicator for you.

## Quick Start
```kotlin
@Composable
fun ProjectTabs() {
    val tabs = listOf(
        TabData("Overview"),
        TabData("Activity", icon = Icons.Filled.List),
        TabData("Settings", enabled = false)
    )
    var selected by rememberSaveable { mutableIntStateOf(0) }

    And_tabgroup_scrltab(
        tabs = tabs,
        selectedIndex = selected,
        onSelected = { selected = it }
    )
}
```
Remember to hoist `selectedIndex` into state (`rememberSaveable` or view-model) so the active tab survives recomposition.

## Parameters
### `And_tabgroup_2tab`
- `tab1: TabData`, `tab2: TabData` - Title/icon/enabled metadata for each tab.
- `selectedIndex: Int` - Zero-based index (0 or 1) indicating the active tab.
- `onSelected: (Int) -> Unit` - Callback when the user taps a tab.
- `modifier: Modifier = Modifier` - Optional layout adjustments.

### `And_tabgroup_3tab`
Same as the two-tab variant but accepts `tab1`, `tab2`, `tab3` and expects `selectedIndex` in `0..2`.

### `And_tabgroup_scrltab`
- `tabs: List<TabData>` - Provide as many entries as you need; the row becomes scrollable when content exceeds the width.
- `selectedIndex`, `onSelected`, `modifier` - Same behavior as the fixed-width variants.

## Supporting Types
### `TabData`
- `title: String` - Visible label.
- `icon: ImageVector? = null` - Optional icon rendered before the label.
- `enabled: Boolean = true` - Disabled tabs render with muted colors and ignore clicks.

### `TabsComponent`
- Internal component that adds the Material3 indicator, handles scrollable vs. fixed rows, and respects `enabled` flags.
- You can call it directly if you need to control properties such as `divider` or provide custom indicators.

## Usage Notes
- Keep `selectedIndex` within the bounds of the tab list; out-of-range values will skip indicator rendering.
- Use `Modifier.fillMaxWidth()` on the composable when tabs should stretch edge-to-edge.
- For tabs that load screens lazily, debounce `onSelected` before triggering expensive work.
- Combine with `TabData.enabled = false` to gate features (for example premium tabs) without removing them from the layout.
- Import any icons you reference, such as `androidx.compose.material.icons.filled.List` in the example above.
