# Package: avatarwithbadge

Use the `com.nexsoft.component.code.avatarwithbadge` package to render avatars augmented with status, icon, or notification badges. Functions follow the `And_avtrwbdg_<variant>_<size>` naming pattern, where `variant` is `ico`, `lgd`, or `number` and `size` is `s` (32.dp) or `m` (40.dp).

## Getting started
- Import the variant you need, e.g.:
  ```kotlin
  import com.nexsoft.component.code.avatarwithbadge.And_avtrwbdg_number_m
  ```
- Build the avatar payload using `AvatarData` from `com.nexsoft.component.base.avatar`:
  ```kotlin
  val avatar = AvatarData(
      name = "Renata Budi",
      src = "https://example.com/profile-renata.jpg"
  )
  ```
  `AvatarData` exposes two optional properties (`name`, `src`). The component loads `src` when present; otherwise it derives initials from `name` or falls back to the default silhouette.

### Shared behavior
- All functions are composable and return `Unit`.
- Badges are rendered on the bottom-right corner unless noted; they inherit rounded borders to sit cleanly on the avatar edge.
- The badge color scheme and typography are handled internally through `AvatarComponentV2` and `AvatarBadge` enums-you only provide the data listed below.

## Icon badge avatars `And_avtrwbdg_ico_*`
Use these to display an icon badge (e.g., a shield or checkmark) on top of the avatar.

- Signature: `@Composable fun And_avtrwbdg_ico_<size>(avatarData: AvatarData, icon: ImageVector? = null)`
- Parameters:
  - `avatarData` - required user data.
  - `icon` - optional `ImageVector` to show inside the badge. If `null`, a default check icon is used.

Example:
```kotlin
And_avtrwbdg_ico_m(
    avatarData = avatar,
    icon = Icons.Default.Verified
)
```

## Legend badge avatars `And_avtrwbdg_lgd_*`
Displays a circular "legend" badge (solid accent dot) to signal premium or highlighted members.

- Signature: `@Composable fun And_avtrwbdg_lgd_<size>(avatarData: AvatarData)`
- No additional parameters; the badge uses the design system's legend color and border treatment.

Example:
```kotlin
And_avtrwbdg_lgd_s(avatarData = avatar)
```

## Notification badge avatars `And_avtrwbdg_number_*`
Adds a numeric indicator (e.g., unread count) to the avatar. Large values display as `99+` so the badge stays compact.

- Signature: `@Composable fun And_avtrwbdg_number_<size>(avatarData: AvatarData, number: Number)`
- Parameters:
  - `avatarData` - required user data.
  - `number` - required. Accepts any numeric type; it is converted to a string for the badge.

Example:
```kotlin
And_avtrwbdg_number_s(
    avatarData = avatar,
    number = 7,
)
```

### Usage tips
- Provide both `name` and `src` when available so the component can fall back gracefully.
- The badge layout is fixed; wrap the call in your own `Box` or `Row` to add spacing, clicks, or semantics.
- For accessibility, surround the avatar with a parent composable that exposes the appropriate `contentDescription` or talkback label.
