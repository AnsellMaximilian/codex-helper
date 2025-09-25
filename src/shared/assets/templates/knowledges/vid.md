# Package: video

## Imports
```kotlin
import com.nexsoft.component.code.video.And_vid_1x1_m
import com.nexsoft.component.code.video.And_vid_2x1_m
import com.nexsoft.component.code.video.And_vid_gldn_m
```

## Component Overview
Video wrappers stream MP4 content through ExoPlayer while enforcing common aspect ratios:
- `And_vid_1x1_*` -> square preview (profile or avatar videos).
- `And_vid_2x1_*` -> standard landscape rectangle.
- `And_vid_gldn_*` -> golden ratio frame (16:10 style hero media).

Each function delegates to `CustomVideoComponent`, which creates an `ExoPlayer` instance, handles autoplay and repeat, and renders controls via `PlayerView` when requested. The `_s`, `_m`, `_l` suffix maps to different `ComponentSize` presets that change the rendered width and height.

## Quick Start
```kotlin
@Composable
fun ProductDemo(videoUrl: String) {
    And_vid_2x1_m(
        videoUri = videoUrl,
        autoPlay = true,
        repeat = false,
        showControls = true
    )
}
```
Pass any HTTP(S) MP4 URL or local file URI; `CustomVideoComponent` creates the media item and begins playback.

## Parameters
- `videoUri: String` -> Source URI passed to ExoPlayer.
- `autoPlay: Boolean = false` -> Start playback immediately when the view appears.
- `repeat: Boolean = false` -> Loop the video when playback reaches the end.
- `showControls: Boolean = true` -> Display ExoPlayer controls inside the `PlayerView`.

## Supporting Types
### `CustomVideoComponent`
- Accepts `componentSize` and `videoComponent` (`SQUARE`, `RECTANGLE`, `GOLDEN`) to compute width/height in dp.
- Releases the ExoPlayer instance on disposal, so you do not need to manage cleanup manually.

### `VideoComponent`
- Enum selecting the aspect ratio preset (`SQUARE`, `RECTANGLE`, `GOLDEN`). The size suffix determines the absolute dp dimensions.

## Usage Notes
- Remember to add network and internet permissions if you stream remote content.
- For autoplay videos, consider muting audio or providing user controls to avoid unexpected playback.
- `repeat = true` sets the ExoPlayer repeat mode to `REPEAT_MODE_ALL`; set it to `false` for one-shot clips.
- Wrap the video in a parent `Box` or `Card` if you need rounded corners or overlays (for example play buttons).
- ExoPlayer buffers on the calling thread; for large files you may want to show a loading indicator while the player prepares.
