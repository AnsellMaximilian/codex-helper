# Package: bottomsheets

Use `com.nexsoft.component.code.bottomsheets` when you need prebuilt modal sheets that follow the Nexsoft visual language. The current catalog exposes an informative sheet layout named `And_btmsheetsctn_infsh`.

## Getting started
- Import the composable:
  ```kotlin
  import com.nexsoft.component.code.bottomsheets.And_btmsheetsctn_infsh
  ```
- Drive the `open` flag from your state and mirror every change through `onOpenChange`:
  ```kotlin
  val (sheetOpen, setSheetOpen) = remember { mutableStateOf(false) }

  And_btmsheetsctn_infsh(
      open = sheetOpen,
      onOpenChange = setSheetOpen,
      title = "Delete project",
      subtitle = "This action cannot be undone",
      description = "The project and all related tasks will be permanently removed.",
      onCancel = { setSheetOpen(false) },
      onOk = { deleteProject(); setSheetOpen(false) }
  )
  ```

### Helper types
- `ImageSource` lives in `com.nexsoft.component.base.util.theme` and wraps either a drawable resource, vector asset, or URL. Pass `null` to hide the illustration.
- `CustomBottomSheetComponent` handles the actual `ModalBottomSheet` behavior. It respects `skipPartiallyExpanded = true`, so the sheet snaps fully open or closed.
- Primary and secondary buttons are rendered with `ButtonComponent` (component types `PRIMARY` and `SECONDARY`, size `SMALL`). Labels are fixed to "OK" and "Cancel".

## `And_btmsheetsctn_infsh`
Informational modal sheet with illustration, heading, subheading, and body copy stacked above two action buttons.

- Signature: `@Composable fun And_btmsheetsctn_infsh(open: Boolean, onOpenChange: (Boolean) -> Unit, title: String, subtitle: String, description: String, modifier: Modifier = Modifier, imageSource: ImageSource? = ImageSource.DrawableResource(R.drawable.default_illustration), onCancel: () -> Unit = {}, onOk: () -> Unit = {})`
- Parameters:
  - `open` - required. Controls whether the sheet is visible. Set to `true` to show the modal.
  - `onOpenChange` - required. Invoked whenever the sheet requests a state change (close button, tap outside, or programmatic hide). Update your `open` state here.
  - `title` - required. Main heading shown near the top.
  - `subtitle` - required. Supporting line beneath the title.
  - `description` - required. Longer body text shown before the action buttons.
  - `modifier` - optional. Applied to the outer `CustomBottomSheetComponent` container (use for semantics or width constraints).
  - `imageSource` - optional illustration. Defaults to `R.drawable.default_illustration`. Supply an `ImageSource.UrlImage` for remote art or `null` to remove the image.
  - `onCancel` - optional click handler for the secondary "Cancel" button. Default is a no-op.
  - `onOk` - optional click handler for the primary "OK" button. Default is a no-op.

### Behavior notes
- The close icon and scrim both call `onOpenChange(false)`; keep that callback inexpensive.
- Buttons trigger their handlers but do not automatically close the sheet. Dismiss the modal inside `onCancel` and `onOk` if needed.
- The layout centers the illustration and left-aligns text. Wrap the composable in your surface or scaffold to manage insets.
- Remote illustrations use Coil under the hood via `CustomImageComponent`; ensure your project includes Coil (already present in the component library).
