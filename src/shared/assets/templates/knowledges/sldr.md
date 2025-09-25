# Package: slider

## Imports
```kotlin
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableFloatStateOf
import androidx.compose.runtime.remember
import com.nexsoft.component.code.slider.And_sldr_dft_0
import com.nexsoft.component.code.slider.And_sldr_perct_0
import com.nexsoft.component.code.slider.And_sldr_vid_0
import com.nexsoft.component.code.slider.And_sldr_aud_0
```

## Component Overview
- `And_sldr_dft_0` renders a plain Material3 slider; you choose the value range, step count, and whether the value is controlled.
- `And_sldr_perct_0` mirrors the default slider but displays a trailing percentage calculated from the supplied range.
- `And_sldr_vid_0` shows elapsed/total time labels, ideal for media scrubbers.
- `And_sldr_aud_0` draws a static audio waveform with a progress indicator, useful for voice-note previews or podcast players.
All variants delegate to base slider primitives so typography, theming, and accessibility match the design system.

## Quick Start
```kotlin
@Composable
fun BrightnessSetting() {
    var level by remember { mutableFloatStateOf(0.6f) }

    And_sldr_perct_0(
        value = level,
        valueRange = 0f..1f,
        steps = 0,
        onValueChange = { newValue -> level = newValue }
    )
}
```
For uncontrolled usage (when you only care about the callback), pass `value = null` and track the latest value inside `onValueChange`.

## Slider Variants
### `And_sldr_dft_0`
- `value: Float? = null` - Provide to control the slider externally. Leave `null` for internal state.
- `steps: Int = 0` - Number of discrete segments between the range bounds (Material3 requirement: set to `segments - 1`).
- `valueRange: ClosedFloatingPointRange<Float> = 0f..1f` - Minimum and maximum slider values.
- `onValueChange: (Float) -> Unit` - Called on every drag/tap with the current slider position.

### `And_sldr_perct_0`
Same parameters as the default slider but always renders a trailing percentage label. Ensure `valueRange` reflects the units you expect (`0f..100f` for percentages, etc.).

### `And_sldr_vid_0`
- `currentDurationInSecond: Int? = null` - Current playback time. When `null`, the slider manages its own state and starts at 0.
- `steps: Int = 0` - Optional frame snapping (set to `durationInSecond - 1` for per-second increments).
- `durationInSecond: Int = 0` - Total media length. Also used to compute the end timestamp label.
- `onValueChange: (Float) -> Unit` - Receives the new position (in seconds) whenever the user scrubs.

### `And_sldr_aud_0`
- `amplitudes: List<Float>` - Waveform sample values (0f..1f recommended). At least one value required.
- `progress: Float` - Playback progress as a fraction (0f at start, 1f at end). Values outside the range are clamped.
- `modifier: Modifier = Modifier` - Use to set width, height (via parent layout), or padding.

## Supporting Types
### `SliderType`
Enum used by `SliderComponent` to switch between default, percentage, and time layouts. The wrappers choose the correct value automatically.

### `Waveform`
`And_sldr_aud_0` wraps this composable. The underlying API supports scrubbing callbacks (`onScrubStart`, `onScrub`, `onScrubStop`) and custom brushes -> use `Waveform` directly if you need those hooks.

### `formatSeconds`
Utility used by time sliders to render `mm:ss` labels. Pass real durations to keep formatting accurate.

## Usage Notes
- Controlled sliders (`value != null`) must update their backing state inside `onValueChange`; otherwise the thumb will snap back.
- For stepped sliders, set `steps` to `count - 1` (e.g., 4 segments -> `steps = 3`).
- Audio waveforms scale input amplitudes to the canvas width; supply evenly sampled data for best results.
- To change colors (track, thumb, waveform brushes), use the base components (`SliderComponent`, `Waveform`) and supply custom parameters.
- Provide semantic context (labels/descriptions) for accessibility: wrap the slider in a column with `Text` describing the control's purpose.
