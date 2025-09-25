# Package: avatargroup

The `com.nexsoft.component.code.avatargroup` package provides ready-made group avatar layouts for Jetpack Compose. Each function renders a list of avatars using predefined sizes (`xs`, `s`, `m`, `l`, `xl`, `xxl`).

## Getting started
- Import the variants you need, e.g.:
  ```kotlin
  import com.nexsoft.component.code.avatargroup.And_avtrgroup_grid_m
  import com.nexsoft.component.code.avatargroup.And_avtrgroup_stack_m
  ```
- Construct `AvatarData` objects for each person:
  ```kotlin
  import com.nexsoft.component.base.avatar.AvatarData

  val members = listOf(
      AvatarData(name = "Ana Maria", src = "https://example.com/avatar-ana.jpg"),
      AvatarData(name = "Ben Lee"), // renders initials
      AvatarData(src = "https://example.com/avatar-placeholder.png")
  )
  ```
  `AvatarData` accepts optional `name: String?` and `src: String?`. When `src` is supplied the component loads the image. Otherwise it falls back to initials (from the first two words) or the default person icon.

### Shared parameters
- `avatars: List<AvatarData>` - required. Order determines display order. Missing or `null` entries are rendered as placeholders.
- `count: Int` - required. Number of avatar slots to show. If greater than `avatars.size`, remaining slots use empty placeholders; if smaller, the list is truncated.
- Size suffix -> diameter: `xs` 24.dp, `s` 32.dp, `m` 40.dp, `l` 48.dp, `xl` 64.dp, `xxl` 80.dp.

## Grid avatars `And_avtrgroup_grid_*`
These layouts render avatars side by side with even spacing. Ideal for contact matrices, summary chips, or any context where all avatars must remain fully visible.

- Signature: `@Composable fun And_avtrgroup_grid_<size>(avatars: List<AvatarData>, count: Int)`
- All avatar slots are fully visible; surplus entries beyond `count` are ignored.

Example:
```kotlin
And_avtrgroup_grid_m(
    avatars = members,
    count = 4,
)
```

## Stack avatars `And_avtrgroup_stack_*`
These layouts overlap avatars horizontally, producing the familiar stacked list indicator. Use them to compactly show membership while hinting at additional people.

- Signature: `@Composable fun And_avtrgroup_stack_<size>(avatars: List<AvatarData>, count: Int)`
- Avatars are layered left to right; each additional slot offsets partially over the previous one. Choose a `count` that matches the number of layers you want in the stack.

Example:
```kotlin
And_avtrgroup_stack_s(
    avatars = members,
    count = 3,
)
```

### Behavior notes
- Provide meaningful `name` values when no image URL is available so the initials render correctly.
- Remote images use Coil under the hood. Ensure Coil is included in your project if you plan to load URLs (already part of the component module).
- The functions return `Unit`; add padding or click handling by wrapping them in your own layout containers.
