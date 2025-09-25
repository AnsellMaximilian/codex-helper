# Package: list

List wrappers in `com.nexsoft.component.code.list` feed data into the base `ListComponent`. Two item templates are provided:
- **Default** list (`DefaultListItem`) - icon, title, trailing chevron.
- **Image** list (`ImageListItem`) - thumbnail, title, subtitle.

Each template has three sizes (`s`, `m`, `l`) and divider variants (`dvdr00` without dividers, `dvdr01` with dividers).

## Default list items
```kotlin
import com.nexsoft.component.code.list.And_list_dft_m_dvdr01
import com.nexsoft.component.base.list.DefaultListItem

val settings = listOf(
    DefaultListItem("home", "Home", Icons.Outlined.Home),
    DefaultListItem("privacy", "Privacy", Icons.Outlined.Lock),
    DefaultListItem("about", "About", Icons.Outlined.Info, enabled = false)
)

And_list_dft_m_dvdr01(
    items = settings,
    onItemClick = { item -> navController.navigate(item.id) }
)
```

### Parameters
- `items: List<DefaultListItem>` - each entry has `id`, `title`, `icon`, and optional `enabled` flag.
- `onItemClick: (DefaultListItem) -> Unit` - called when an enabled row is tapped. Disabled items ignore taps.
- `modifier: Modifier` - optional wrapper to add padding or set height.

### Size suffix
- `_s_` uses `ComponentSize.SMALL` (64.dp row height).
- `_m_` uses `ComponentSize.MEDIUM` (84.dp).
- `_l_` uses `ComponentSize.LARGE` (104.dp).

### Divider suffix
- `_dvdr00` renders the list without separators (ideal when the parent adds spacing).
- `_dvdr01` inserts a `HorizontalDivider` between rows.

## Image list items
```kotlin
import com.nexsoft.component.code.list.And_list_img_l_dvdr00
import com.nexsoft.component.base.list.ImageListItem
import com.nexsoft.component.base.util.theme.ImageSource

val contacts = listOf(
    ImageListItem("0", "Ayu Rahma", "Online", ImageSource.UrlImage(avatarUrl)),
    ImageListItem("1", "Bayu", "Last seen 5m ago")
)

And_list_img_l_dvdr00(items = contacts, onItemClick = { item -> openProfile(item.id) })
```
- `ImageListItem` includes `subtitle` and `image: ImageSource` (defaults to the placeholder).
- Size and divider suffixes behave exactly like the default list.

## Behaviour notes
- `ListComponent` handles scroll state internally via `LazyColumn`. Items use `id` as the key; make sure ids are stable.
- Row containers call `onItemClick` only when `enabled` is true. Disabled entries render with reduced alpha.
- The wrappers pass `contentPadding = PaddingValues(vertical = 8.dp)`; supply your own modifier to adjust spacing around the list.

## Tips
- Provide concise titles/subtitles; both are single-line and ellipsised when too long.
- Use `rememberLazyListState()` yourself and pass it to `ListComponent` if you need scroll position handling (e.g., for rememberable tab state). Drop to the base component for that.
- Combine with `mutableStateListOf` or `LazyColumn` item animations when you need dynamic insert/remove behaviour.

## Related base APIs
- `DefaultListItem` and `ImageListItem` - data classes consumed by the wrappers.
- `ListComponent(items, onItemClick, componentSize, showDividers, contentPadding)` - base component for custom lists. It supports mixed item types by passing a heterogeneous `List<ListItem>`.
- `ListItemContainer` - reusable row container if you build custom item layouts.
