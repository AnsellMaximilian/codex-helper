# Package: replybubble

Components under `com.nexsoft.component.code.replybubble` provide supporting UI for rich chat experiences: multi-image thumbnails, quoted reply bubbles, and selection wrappers. They share the same visual language as the main chat bubbles.

## Multi-image bubbles `And_chatmultiimg_*`
```kotlin
And_chatmultiimg_sendmsg(
    status = ChatComponentMessageStatus.SEEN,
    time = "20:11",
    images = thumbs,
    onImageClick = { index, item -> openViewer(index, item) },
    onSeeAll = { openGallery() }
)
```
- `images: List<ChatImageThumb>` controls up to four tiles. Extra images collapse behind a `+N` overlay that triggers `onSeeAll`.
- `ChatImageThumb(src, blurred)` uses Coil internally. Set `blurred = true` when content is pending moderation so the bubble renders a blur until tapped.
- `onImageClick` receives the absolute index from the original list (0-based) and the `ChatImageThumb` itself.
- `status` and `time` render the same tick/timestamp treatment as other chat bubbles.
- The receive variant `And_chatmultiimg_recvmsg` shares the signature but renders with the recipient palette.

## Reply bubbles
Quoted replies reuse a single base component with different `ReplyType`s. Each wrapper takes the quoted sender `name`, the payload, and an optional `Modifier`.

| Wrapper | ReplyType produced | Notes |
| --- | --- | --- |
| `And_chatrepl_txtlong_*` | `ReplyType.Message` | Use for long-form text. Pass the plain message string. |
| `And_chatrepl_img_*` | `ReplyType.Photo` | `src` is a thumbnail URL. |
| `And_chatrepl_vid_*` | `ReplyType.Video` | Showcases the video length; supply the formatted `duration` (e.g. `"01:09"`). |
| `And_chatrepl_aud_*` | `ReplyType.Voice` | Display-only; combine `name` and recorded `duration`. |
| `And_chatrepl_doc_*` | `ReplyType.Document` | Requires the original `ChatDocumentType` so the correct icon appears. |
| `And_chatrepl_ctc_*` | `ReplyType.Contact` | `contact` is a single number/email. |
| `And_chatrepl_ctcmulti_*` | `ReplyType.Contact` with multiple entries | Supply `contacts` for multi-contact shares. |
| `And_chatrepl_map_*` | `ReplyType.Location` | Uses `LatLng` to preview a static map. Ensure Google Maps dependencies exist. |

Every wrapper has a send (`_sendmsg`) and receive (`_recvmsg`) flavour which only toggles the colour scheme.

### Behaviour
- Reply bubbles are static context headers; they do not expose click callbacks. Wrap them in your own clickable container if the entire reply should open the referenced message.
- Icons change automatically depending on the reply type. For documents, the label shows the file name; for multi-contact replies the label becomes `"<N> Contacts"`.

## Selection helper `And_chatslc_*`
Use `And_chatslc_sendmsg` / `And_chatslc_recvmsg` to add selection checkboxes next to any bubble (the component accepts a `chatBubble` lambda so you can embed the full message).
```kotlin
And_chatslc_recvmsg(
    isSelected = state.isSelected,
    onSelectedChange = { viewModel.toggleSelection(id) }
) {
    And_chat_txtshrt_recvmsg_txt01(status, msg, time)
}
```
The checkbox uses `CheckboxOption` from the base checkbox package and scales automatically with text size.

## Tips
- Keep reply content short; the component clamps text to one or two lines and will ellipsize overly long names, captions, and descriptions.
- For photo replies, provide a cached thumbnail if possible to avoid flashing the placeholder in the quote preview.
- Multi-image bubbles expect at least one `ChatImageThumb`. Guard against empty lists in your calling code to avoid rendering an empty card.
