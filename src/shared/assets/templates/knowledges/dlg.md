# Package: dialog

Dialog wrappers live in `com.nexsoft.component.code.dialog` and forward to the shared `DialogComponent`. Each variant wires default action buttons and content slots.

## Common pattern
All wrappers follow the same state contract:
```kotlin
var open by remember { mutableStateOf(false) }

And_dlg_dft(
    open = open,
    title = "Delete photo?",
    description = "This action cannot be undone.",
    onOpenChange = { open = it },
    onOk = {
        viewModel.delete()
        open = false
    }
)
```
- `open: Boolean` controls visibility.
- `onOpenChange: (Boolean) -> Unit` must update your state; the component calls it when the dialog should close (cancel, outside tap, back press). The `OK` handler **does not** close the dialog automatically, so call `onOpenChange(false)` yourself after successful actions.

## Variants
### Default confirmation `And_dlg_dft`
- `title: String` - heading text.
- `description: String` - body copy rendered as plain text inside the content slot.
- Buttons: primary `OK` and secondary `Cancel` (labels are fixed). Override behaviour by wrapping the base component if you need different labels.

### Illustration dialog `And_dlg_illust`
Adds an image banner above the title/subtitle.
- `title`, `subtitle`: displayed under the illustration.
- `imageSource: ImageSource` - defaults to `R.drawable.default_illustration`. Accepts URL/vector/drawable sources.
- `onOpenChange`, `onOk` follow the same rules as the default dialog.
- The content slot is empty (only spacer). If you need extra text, extend the wrapper or use the base dialog.

### List selector `And_dlg_list`
Presents a scrollable list of radio buttons.
- `radioItems: List<DialogRadioItem>` - each item has `label`, `value`, and optional `enabled` flag.
- `selectedValue: String?` - currently selected `value`. Must be part of `radioItems` (or null for none).
- `onSelected: (String) -> Unit` - called when the user taps a radio row. Update `selectedValue` in your state.
- `title`, `subtitle`, `onOpenChange`, `onOk` behave as above.
- The list height is capped at 240.dp; longer lists scroll.

## Tips
- Keep dialog content lightweight; use additional screens for complex forms.
- For one-off alerts needing custom buttons/slots, drop down to `DialogComponent` directly.
- Remember to handle the dialog on rotation or process death by persisting the `open` state (e.g., view-model or saved state).
- When hooking into analytics, log from `onOk` and `onOpenChange(false)` to capture both confirmations and cancellations.

## Related base APIs
- `DialogComponent(visible, onDismissRequest, title, actions) { content }` - use this when you need custom layouts or button sets.
- `DialogRadioItem` - simple data class the list variant consumes.
