# Package: cardfeed

Card feed components render reposted content in a social timeline style. Import them from `com.nexsoft.component.code.cardfeed`.

## Getting started
- Import the wrapper you need:
  ```kotlin
  import com.nexsoft.component.code.cardfeed.And_cardfeed_repostimg_otd
  ```
- Build a `RepostItem` with author and post details:
  ```kotlin
  val post = RepostItem(
      image = ImageSource.UrlImage(authorAvatarUrl),
      name = "Jane Doe",
      date = Date(),
      postImage = ImageSource.UrlImage(photoUrl),
      postCaption = "Weekend getaway at the beach!"
  )
  ```
- Provide optional actions to populate the overflow menu:
  ```kotlin
  val actions = listOf(
      RepostAction(name = "Report") { selected -> viewModel.report(selected) },
      RepostAction(name = "Share") { selected -> share(selected) }
  )
  ```

`RepostItem`, `RepostAction`, `RepostStyle`, and `RepostType` reside in `com.nexsoft.component.base.cardfeed`.

### Shared parameters
- `post: RepostItem` - required. Contains avatar image, author name, timestamp, optional post image, and caption.
- `showMenu: Boolean` - toggles the kebab menu. When `true`, the component renders a dropdown fed by `actions`.
- `avatarContentScale: ContentScale` - how the avatar fits its circular bounds (usually `ContentScale.Crop`).
- For image variants, `postContentScale: ContentScale` controls how the main media is scaled; text variants skip this argument.
- `actions: List<RepostAction>` - optional overflow entries. Each action gets the current `RepostItem` when invoked.

## Image repost cards `And_cardfeed_repostimg_*`
Render posts containing media. The three style suffixes map to `RepostStyle.OUTLINED`, `SHADOW`, and `COLOR`.

- Signatures share the shape:
  `@Composable fun And_cardfeed_repostimg_<style>(post: RepostItem, showMenu: Boolean, avatarContentScale: ContentScale, postContentScale: ContentScale, actions: List<RepostAction> = emptyList())`
- Use `ContentScale.Crop` for immersive imagery, or `ContentScale.Fit` to preserve the original aspect.

Example:
```kotlin
And_cardfeed_repostimg_shdw(
    post = post,
    showMenu = true,
    avatarContentScale = ContentScale.Crop,
    postContentScale = ContentScale.Crop,
    actions = actions
)
```

## Text repost cards `And_cardfeed_reposttxt_*`
Display reposts without media. Styling options mirror the image variant.

- Signature: `@Composable fun And_cardfeed_reposttxt_<style>(post: RepostItem, showMenu: Boolean, avatarContentScale: ContentScale, actions: List<RepostAction> = emptyList())`
- Best paired with long captions or commentary-only reposts.

Example:
```kotlin
And_cardfeed_reposttxt_clr(
    post = post,
    showMenu = false,
    avatarContentScale = ContentScale.Crop
)
```

### Behavior notes
- `RepostComponent` automatically formats dates and truncates lengthy captions with a "show more" affordance when needed.
- When providing `ImageSource.UrlImage`, ensure Coil is available (already bundled with the component library).
- To disable the menu entirely, set `showMenu = false` and leave `actions` at its default.
- For analytics, wrap the component in your own `Modifier.clickable` to capture surface taps while keeping the internal menu functional.
