# Package: avatar

Components in `com.nexsoft.component.code.avatar` are Jetpack Compose building blocks for rendering circular user avatars at predefined sizes. Each function name ends with the size token (`xs`, `s`, `m`, `l`, `xl`, `xxl`). Use them inside your own composable functions.

## Getting started
- Add the import for the exact size you need, for example:
  ```kotlin
  import com.nexsoft.component.code.avatar.And_avtr_dft_m
  import com.nexsoft.component.code.avatar.And_avtr_init_m
  ```
- Call the composable within a Compose scope:
  ```kotlin
  @Composable
  fun ProfileAvatar(name: String?, isDefault: Boolean) {
      if (isDefault) {
          And_avtr_dft_m()
      } else {
          And_avtr_init_m(name = name ?: "")
      }
  }
  ```

### Available sizes
- `xs` ~ 24.dp diameter
- `s` ~ 32.dp diameter
- `m` ~ 40.dp diameter
- `l` ~ 48.dp diameter
- `xl` ~ 64.dp diameter
- `xxl` ~ 80.dp diameter

## Default avatars `And_avtr_dft_*`
Use these when you need a neutral placeholder avatar (e.g., no profile information yet). They show a default person silhouette and require no data.

- Parameters: none (all visual attributes are baked into the component).
- All functions are composable and return `Unit`. Invoke them directly in layout code.

Example:
```kotlin
import com.nexsoft.component.code.avatar.And_avtr_dft_xl

@Composable
fun EmptyStateAvatar() {
    And_avtr_dft_xl()
}
```

## Initial avatars `And_avtr_init_*`
Use these when you have a user or entity name and want to display its initials on a color-coded background.

- Signature: `@Composable fun And_avtr_init_<size>(name: String)`
- Parameters:
- `name: String` - required. Provide the full display name. The component derives initials from the first character of the first two words (e.g., "Ana Maria" -> "AM"); single-word names produce a single-letter initial. Pass a non-blank string to avoid an empty avatar.
- All other styling (colors, typography per size) is managed internally.

Example:
```kotlin
import com.nexsoft.component.code.avatar.And_avtr_init_s

@Composable
fun MemberChip(memberName: String) {
    And_avtr_init_s(name = memberName)
}
```

### Behavior notes
- Pick the size suffix that matches the container: `xs`/`s` work well in dense lists, `m`/`l` for standard profile rows, and `xl`/`xxl` for spotlight layouts.
- The initial variant automatically uppercases the initials and assigns a consistent background tint based on the name, so the same name always renders with the same color.
