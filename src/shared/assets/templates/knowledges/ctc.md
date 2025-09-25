# Package: contact

Contact list items live in `com.nexsoft.component.code.contact`. Each wrapper forwards to the base `ContactComponent` and differs only in size (`s`, `m`, `l`) and whether a bottom divider is displayed (`dvdr01` -> divider on, `dvdr00` -> divider off).

## Getting started
```kotlin
import com.nexsoft.component.code.contact.And_ctc_m_dvdr01
import com.nexsoft.component.base.contact.ContactItem
import com.nexsoft.component.base.util.theme.ImageSource

val contact = ContactItem(
    image = ImageSource.UrlImage("https://cdn.example.com/avatar.jpg"),
    name = "Ayu Rahma",
    date = "10:45 AM",
    leftIcon = painterResource(R.drawable.ic_phone),
    message = "Missed call",
    rightIcon = painterResource(R.drawable.ic_more)
)

And_ctc_m_dvdr01(
    item = contact,
    avatarContentScale = ContentScale.Crop,
    onCLick = { selected -> viewModel.openThread(selected.id) },
    onLongClick = { selected -> viewModel.toggleSelection(selected.id) },
    onLongClickBackground = Color(0xFFFDE8E8)
)
```

### Parameters
- `item: ContactItem` - data model with `image`, `name`, `date`, `message`, and icons (`leftIcon`, `rightIcon`). `image` accepts any `ImageSource` (URL/Drawable/Vector) or `null` for initials.
- `avatarContentScale: ContentScale` - choose how the avatar should scale inside its circle (e.g., `ContentScale.Crop`).
- `onCLick: (ContactItem) -> Unit` - click handler for regular taps.
- `onLongClick: (ContactItem) -> Unit` - invoked when the row is long-pressed. The base component also toggles a background colour to visually indicate selection.
- `onLongClickBackground: Color` - background colour to apply while the item remains in the long-pressed state. Reset it in your state when deselecting.

### Size variants
- `And_ctc_s_*` - compact row (`ComponentSize.SMALL`), 40.dp avatar.
- `And_ctc_m_*` - default row (`ComponentSize.MEDIUM`), 52.dp avatar.
- `And_ctc_l_*` - spacious row (`ComponentSize.LARGE`), 64.dp avatar.

### Divider suffix
- `_dvdr01` - renders a `HorizontalDivider` beneath the row (useful in lists).
- `_dvdr00` - no divider (use when you manage separators externally).

### Behaviour
- Long press changes the item background to `onLongClickBackground` and triggers `onLongClick`. The wrapper does not reset selection-handle that in your view model.
- Icons and text styles adapt to the chosen size (font weights and sizes come from `ContactComponent`).
- The component consumes gestures using `pointerInput` so clicks and long presses don't bubble further up. Wrap inside `SelectableGroup` if you need accessibility grouping.

### Tips
- Provide short `message` strings; the content is ellipsized to one line.
- For accessibility, set content descriptions on `leftIcon`/`rightIcon` painters if they represent actions.
- If you want swipe actions or more complex item states, use the base `ContactComponent` with your own `Modifier` chain.

### Related base APIs
- `ContactComponent` - accepts additional styling knobs like custom text styles (via lower-level parameters).
- `ContactItem` - helper data class that you can extend with extra metadata via composition or by keeping a map from `id` to domain data.
