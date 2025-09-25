# Package: image

Wrappers under `com.nexsoft.component.code.image` provide fixed-aspect image placeholders wired to `CustomImageComponent`. Three aspect ratios are offered:
- `img_1x1` - square.
- `img_2x1` - rectangle (2:1).
- `img_gldn` - golden ratio (approx. 1.618:1).

Each ratio has small (`_s`), medium (`_m`), and large (`_l`) size variants mapping to `ComponentSize.SMALL`, `ComponentSize.MEDIUM`, and `ComponentSize.LARGE` respectively.

## Usage
```kotlin
import com.nexsoft.component.code.image.And_img_2x1_m
import com.nexsoft.component.base.util.theme.ImageSource

And_img_2x1_m(
    imageSource = ImageSource.UrlImage(heroUrl),
    contentDescription = "Featured tour"
)
```

### Parameters
- `modifier: Modifier = Modifier` - style or constrain the image container (padding, click handling, etc.).
- `imageSource: ImageSource?` - asset to display. Use `null` to render the design-system placeholder (`ic_no_image_grey_component`).
- `contentDescription: String?` - pass non-null text for accessibility when the image conveys meaningful content. Keep `null` for decorative imagery.

### Behaviour
- Internally calls `CustomImageComponent`, which handles Coil loading, placeholders, and default sizes for each `ComponentSize`/`ImageComponent` combination.
- `fullWidth`/`customWidth`/`customHeight` are preconfigured for each aspect ratio. If you need different dimensions, drop down to `CustomImageComponent` directly.
- All variants respect the supplied modifier; wrap them in `Box` or `Card` if you need elevation or clipping beyond the defaults.

### Tips
- Choose the smallest variant that fits the layout to avoid unnecessary overdraw.
- When loading remote images, provide an error state (e.g., show an overlay) by wrapping the component and reacting when `imageSource` is null or fails in your data layer.
- Combine with `rememberImagePainter`/custom Coil builder if you need headers, transformations, or request listeners; pass the resulting `ImageSource` URL as usual.

### Related base APIs
- `CustomImageComponent` - exposes sizing parameters (`componentSize`, `imageComponent`, `fullWidth`, `customWidth/Height`).
- `ImageComponent` enum - values: `SQUARE`, `RECTANGLE`, `GOLDEN`.
