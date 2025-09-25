# Package: chat

Bubble wrappers under `com.nexsoft.component.code.chat` let you drop fully styled sender/receiver messages without dealing with the base chat primitives. Every function comes in a `_sendmsg_` and `_recvmsg_` flavour; they only differ by the `isSender` flag passed to the base component. Pick the variant that matches the author of the message.

## Getting started
- Import the bubble you need, e.g. `import com.nexsoft.component.code.chat.And_chat_txtlong_sendmsg_txt01`.
- Provide pre-formatted strings for `time`, `durationText`, `videoSizeOrLength`, etc. The components do not localise or derive these values for you.
- When a function exposes `onAction`, `onPlayPause`, `onJoinClick`, or similar callbacks, you **must** update your own UI state (for instance, advancing a download from `NOT_DOWNLOADED` to `DOWNLOADING`). The components never mutate state internally.
- `highlightMsg` is optional text used by the base helpers to draw a red highlight over search matches. Pass `null` when no highlighting is required.

### Shared data models
- `ChatComponentMessageStatus` (`PENDING`, `SEND`, `DELIVERED`, `SEEN`) controls the tick icon and its tint. Only sender bubbles show the tick.
- `ChatDocumentStatus` (`NOT_DOWNLOADED`, `DOWNLOADING`, `DOWNLOADED`, `FAILED`) and `ChatDocumentType` are in `com.nexsoft.component.base.chat.document`. Status feeds the CTA state (download, cancel, retry).
- `ChatImageOrientation` (`SQUARE`, `PORTRAIT`, `LANDSCAPE`) and `ChatImageStatus` mirror the same state machine as documents but for media; pair them with `imageProcess` (0-100) for download progress.
- `ChatVideoOrientation` and `ChatVideoStatus` behave just like the image equivalents.
- `ChatImageThumb(src: String, blurred: Boolean = false)` comes from the multiple-image helper and is used by multi-image bubbles.
- `ContactAction(label, action)` and `GroupInviteAction(label, action)` populate overflow menus in contact cards and group invites.
- `LinkMetadata(title, description, imageUrl, siteName)` feeds the share-link preview. You can prefetch it yourself or let the base component fetch it asynchronously.
- `LatLng(latitude, longitude)` lives in `com.nexsoft.component.base.map` so you can provide coordinates without pulling Google Maps types into your module.

## Bubble catalogue
### Plain text
- `And_chat_txtshrt_*` renders single-paragraph messages (no `highlightMsg`).
- `And_chat_txtlong_*` allows multi-line content.
- `And_chat_txtlongfind_recvmsg_txt01` highlights `highlightMsg` inside the body.
- `And_chat_viewhldr_recvmsg_txt01` is a lightweight placeholder bubble (name + time) that you can make clickable; useful for quoted replies or "view more" items.
- `And_chat_delt_*` shows deleted-message placeholders with just the timestamp.

### Audio messages
`And_chat_aud_sendmsg_txt00` / `And_chat_aud_recvmsg_txt00`
- `amplitudes`: waveform data (normalise to 0-1). The list must stay constant so scrubbing stays in sync.
- `progress`: playback progress between 0f and 1f. Update this from your media player.
- `isPlaying`: drives the play/pause icon.
- `durationText`: formatted playback length (e.g. `"01:24"`).
- `timeText`: timestamp displayed under the bubble.
- `onPlayPause`: toggle playback. Optional scrubbing callbacks are available in the base component if you need them.

### Documents
`And_chat_doc_sendmsg_txt00/01`, `And_chat_doc_recvmsg_txt00/01`
- Choose `_txt00` to omit a caption or `_txt01` to show an accompanying text with optional `highlightMsg`.
- `documentProcess`: progress percentage (0-100) while `documentStatus == DOWNLOADING`; use `-1` if progress is unknown.
- `onAction` receives the current `ChatDocumentStatus` whenever the user taps the CTA (download, cancel, retry). Use it to update your view state and switch status.
- `documentType` picks the icon colour (PDF, DOCX, etc.).

### Images
`And_chat_img_sendmsg_*`, `And_chat_img_recvmsg_*`
- `imageOrientation` sets the bubble size. Pair it with `imageSrc` (URL or base64) for loading via Coil.
- `imageStatus` + `imageProcess` mirror the document behaviour (download, cancel, retry). Returning `ChatImageStatus.DOWNLOADING` from `onAction` lets you cancel in-flight downloads.
- `_txt01` renders a caption with highlight support; `_txt00` is a bare image.

### Videos
`And_chat_vid_sendmsg_*`, `And_chat_vid_recvmsg_*`
- `videoOrientation` works like `imageOrientation`.
- `videoStatus`/`videoProcess` follow the same status machine.
- `videoSizeOrLength` is a single string; for downloads you might use `"9.7 MB"`, for streamed media `"01:06"`.
- `onAction` toggles download/cancel/retry based on `videoStatus`. `onPlay` fires when the play icon is tapped-launch your player from there.

### Share links
`And_chat_shrlink_sendmsg_*`, `And_chat_shrlink_recvmsg_*`
- Always pass the raw `url`. If you have preview data, supply `LinkMetadata`; otherwise the base component can fetch it (network permission required).
- `_txt01` adds a user caption; `_txt00` shows only the link preview.

### QR code cards
`And_chat_chatqr_*`
- Optional `msg` plus highlight support. `onClick` typically opens a full-screen code or copies the link.

### Maps
`And_chat_map_*`
- Accept a `LatLng` target plus optional caption. `mapZoom` defaults to `15f`.
- Compose Google Maps must be available in your app; the base component wraps `GoogleMap` under the hood.
- Wire `onMapClick` to deep link into full map navigation.

### Contacts
`And_chat_ctc_*` for single contact cards, `And_chat_ctcmulti_*` for small carousels.
- `images`: avatar URLs (null entries fall back to initials).
- `multipleButton`: toggles one or two CTA buttons (`button1`, `button2`).
- `actions`: `List<ContactAction>` feeding the overflow menu when `showMenu` is true.
- `onButtonXClick`: handle CTA taps.

### Group invites
`And_chat_groupinv_*`
- Provide branding via `imageUrl`, `groupName`, optional `groupDescription`, and `invitationMessage`.
- `onJoinClick` and `onInvitationClick` are separated so you can track the CTA separately from tapping the invitation message.
- Use `actions` (list of `GroupInviteAction`) to populate the kebab menu (copy link, report, etc.). Set `showMenu = false` to hide it.

### Post previews
`And_chat_postimg_*`
- `postImageSrc`: hero image. `_txt01` adds `postCaption`.
- Use `postAuthorImageSrc`, `postAuthorName`, and `postDateTime` for context.
- `onPostClick` should open the original content.

### Multiple contact chips
`And_chat_ctcmulti_*` shares the same parameters as `And_chat_ctc_*` but renders a multi-contact layout. Use it for sending contact bundles.

### Deleted placeholders
`And_chat_delt_*` show a standard deleted-message label. Only `time` is required.

### Long text search results
`And_chat_txtlongfind_recvmsg_txt01` is the only bubble that requires `highlightMsg`; use it when showing search snippets.

### Selection helper
`And_chatslc_sendmsg` / `And_chatslc_recvmsg` wrap any chat bubble in a row with a checkbox. Provide `chatBubble` as a lambda that renders the inner bubble. Use this for multi-select operations (forward, delete, etc.).

### Audio/video replies & view holders
All reply bubbles live in `com.nexsoft.component.code.replybubble`. See the dedicated documentation in `chatmultiimg.md` for details.

## Usage tips
- Keep status enums in sync with your backend so the correct icons show. For example, move from `SEND` to `DELIVERED` once you receive a delivery receipt.
- Always debounce destructive callbacks such as `onJoinClick`/`onAction` so repeated taps do not launch duplicate requests.
- Images and videos rely on Coil; ensure Coil is on your classpath and provide a network-capable `ImageLoader` if you use custom OkHttp interceptors.
- Map bubbles require Google Play Services on the device. Hide `onMapClick` functionality if maps are unavailable.
- Many bubbles accept optional `highlightMsg`; when you pass a value, use the same casing as the search query so the built-in highlighter can find matches.
