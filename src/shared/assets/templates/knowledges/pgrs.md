# Package: progress

## Imports
```kotlin
import com.nexsoft.component.code.progress.And_pgrs_spnr_s
import com.nexsoft.component.code.progress.And_pgrs_pgrsbar_m
import com.nexsoft.component.code.progress.And_pgrs_dwnld_l
```
Pick the size suffix (`_s`, `_m`, `_l`) that matches your use case.

## Component Overview
- `And_pgrs_spnr_*` exposes circular progress indicators sized for inline loading states.
- `And_pgrs_pgrsbar_*` renders linear progress bars without labels; ideal for step indicators or media buffering.
- `And_pgrs_dwnld_*` wraps a circular indicator with a dimmed background and a close icon for cancellable downloads.
All variants are thin wrappers around reusable base progress components so callers never touch internal styling knobs directly.

## Quick Start
```kotlin
@Composable
fun UploadStatusCard(progress: Float, onCancel: () -> Unit) {
    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        Text("Uploading report", style = MaterialTheme.typography.titleMedium)

        And_pgrs_pgrsbar_m(progress = progress)

        Row(horizontalArrangement = Arrangement.spacedBy(24.dp)) {
            And_pgrs_spnr_s(progress = progress)
            And_pgrs_dwnld_l(
                progress = progress,
                onClick = onCancel
            )
        }
    }
}
```
Ensure `progress` stays in the `0f..1f` range; values beyond 1f will overflow the indicator.

## Parameters by Variant
### `And_pgrs_spnr_s` / `_m` / `_l`
- `progress: Float` - Completion ratio between 0f and 1f.
- `modifier: Modifier = Modifier` - Add padding, size, or semantics.
- Size suffix controls the rendered diameter (`ComponentSize.SMALL`/`MEDIUM`/`LARGE`).
- Uses theme primary color for the arc and `colorBackgroundGray` for the track.

### `And_pgrs_pgrsbar_s` / `_m` / `_l`
- `progress: Float` - Linear indicator fill percentage.
- `modifier: Modifier = Modifier` - Apply layout modifiers (`fillMaxWidth()` is common).
- Size suffix maps to bar thickness (4 dp, 6 dp, 8 dp respectively).
- No label is displayed; combine with surrounding text when you need captions.

### `And_pgrs_dwnld_s` / `_m` / `_l`
- `progress: Float` - Circular download progress.
- `modifier: Modifier = Modifier` - Place inside overlays, badge stacks, etc.
- `onClick: () -> Unit = {}` - Optional cancel handler invoked when users tap the close icon.
- Painted with a translucent dark background, white progress stroke, and white close icon. The indicator doubles as a button when `onClick` is provided.

## Supporting Types
### `ComponentSize`
- Enum that standardizes sizing across components. Small/medium/large adjust diameter, stroke thickness, icon size, and typography.

### `CircularProgressBarComponent`
- Underlies spinner and download variants. Accepts extra knobs (`label`, `progressColor`, `trackColor`, `backgroundColor`, `icon`). The wrappers supply defaults but you can call the base component directly if you need custom styling.

### `LinearProgressBarComponent`
- Powers the linear variants. Supports optional labels via `label` and `showProgressLabel`  the plain progress wrappers leave those off.

## Usage Notes
- Wrap the circular variants in `Box` with `contentAlignment = Alignment.Center` when layering above thumbnails or avatars.
- Combine linear bars with `AnimatedVisibility` or `Crossfade` when transitioning between determinate and indeterminate states.
- When binding to flows, remember to clamp the ratio: `progress.coerceIn(0f, 1f)` guards against backend rounding errors.
- The download variant assumes a light icon on dark content; swap to `CircularProgressBarComponent` directly if you need alternative color combinations.
