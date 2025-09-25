# Package: expansionpanelcontent

These wrappers live in `com.nexsoft.component.code.expansionpanelcontent` and provide the building blocks for expandable sections and their default content layouts.

## Expandable panel `And_expnpanel_dft`
```kotlin
import com.nexsoft.component.code.expansionpanelcontent.And_expnpanel_dft

And_expnpanel_dft(title = "Shipping details") {
    Text("Ships in 5-7 business days")
}
```
- `title: String` - heading displayed in the clickable row.
- `content: @Composable () -> Unit` - body rendered when expanded.
- `modifier: Modifier` - optional styling wrapper.

Internally this delegates to the base `ExpandableCard`, which adds an arrow icon, slide/fade animation, and divider. Expansion state is managed internally; tap the row or arrow to toggle.

### Behaviour
- Arrow rotates 180 degrees to indicate expanded/collapsed state.
- Divider is shown between header and content. Drop down to `ExpandableCard` if you need to hide it or set custom colours.
- Animation uses `expandVertically`/`shrinkVertically` with fade.

## Content helpers
Use these inside the panel or independently when you want consistent styling.

### `And_expnpanelctn_txt`
Renders plain text with spacing appropriate for body copy.
```kotlin
And_expnpanelctn_txt(text = "Lorem ipsum dolor sit amet...")
```

### `And_expnpanelctn_list`
Displays a bulleted list of strings.
```kotlin
And_expnpanelctn_list(items = listOf("Fast delivery", "Free returns", "24/7 support"))
```

### Tips
- Keep panel content lightweight; nest additional panels sparingly to avoid confusing UX.
- Combine with `rememberSaveable` + custom state if you need programmatic control of expansion. In that case, use the base `ExpandableCard` and pass a boolean `expanded` value yourself.
- For long lists, wrap `And_expnpanelctn_list` in a `LazyColumn` to avoid height issues.
