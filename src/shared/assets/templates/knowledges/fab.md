# Package: fab

`com.nexsoft.component.code.fab` exposes floating action button menus powered by the base `FabComponent`. Two layouts are provided:
- `And_fab_5listico` - vertical speed-dial (label + icon stacked vertically).
- `And_fab_9listico` - grid menu (up to 9 items arranged in a 3xN grid).

## Getting started
```kotlin
import com.nexsoft.component.code.fab.And_fab_5listico
import com.nexsoft.component.base.fab.FabAction

val actions = listOf(
    FabAction("Add", Icons.Default.Add) { onAdd() },
    FabAction("Share", Icons.Default.Share) { onShare() },
    FabAction("Delete", Icons.Default.Delete) { onDelete() },
)

And_fab_5listico(actions = actions)
```

### Parameters
- `actions: List<FabAction>` - each action needs a `label`, an `ImageVector` icon, and an `onClick` lambda.
- `expanded: Boolean? = null` - supply a boolean to control the menu externally. When `null`, the component manages its own expansion state.
- `onExpandedChange: ((Boolean) -> Unit)?` - called whenever the expanded state toggles. Required when you control `expanded`; optional otherwise.

### Behaviour
- Tapping the main FAB toggles expansion. When the menu is open, tapping outside or pressing back collapses it.
- For vertical menus, each action shows a label chip and a mini FAB. Selecting an action collapses the menu then invokes `onClick`.
- Grid menus display actions in a surfaced panel with icon above label.
- The main FAB icon rotates (`+` to `x`) to reflect state.

### Controlled vs uncontrolled
- **Uncontrolled** (default): omit `expanded` and the component stores state internally. You can still observe changes via `onExpandedChange`.
- **Controlled**: pass a `Boolean` `expanded` value and update it in `onExpandedChange`. Required when the same menu state is shared across screens.

### Tips
- Keep the number of actions reasonable (<= 5 for vertical, <= 9 for grid) to avoid cramped layouts.
- Provide concise labels; the grid layout truncates long text.
- For accessibility, ensure icons convey meaning and labels are translatable.
- Wrap the FAB in a `Scaffold` `floatingActionButton` slot to inherit proper padding from system bars.
- Remember to collapse the menu when navigating away to prevent back-stack flicker.

### Related base APIs
- `FabComponent` - exposes additional parameters such as `modifier` and `FabType`. Use it for custom positioning or completely custom menus.
- `FabAction` - simple data class (`label`, `icon`, `onClick`).
