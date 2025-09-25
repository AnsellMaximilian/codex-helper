# Package: carousel

`com.nexsoft.component.code.carousel` provides simple image carousels backed by the base `Carousel` component. Choose the size that suits your layout:
- `And_crsl_s` - short carousel (approx. 222.dp tall).
- `And_crsl_m` - medium carousel (approx. 360.dp tall, numbered indicator).
- `And_crsl_l` - large full-bleed carousel (fills available size, dot indicator).

## Getting started
```kotlin
import com.nexsoft.component.code.carousel.And_crsl_m
import com.nexsoft.component.base.util.theme.ImageSource

val banners = listOf(
    ImageSource.UrlImage("https://cdn.example.com/img1.jpg"),
    ImageSource.UrlImage("https://cdn.example.com/img2.jpg"),
)

And_crsl_m(images = banners)
```

### Parameters
- `images: List<ImageSource>` - ordered list of images. The carousel loops through them page by page. Use `ImageSource.UrlImage`, `.DrawableResource`, or `.VectorImage` to match your asset type.

### Behaviour
- The base `Carousel` handles swipe gestures and page indicators. The wrappers specify indicator style (`IndicatorType.Dot` for large, `.Number` for medium/small) and predefined heights.
- Image loading is delegated to `CustomImageComponent`, so Coil must be available when you use URL sources.
- Carousels do not auto-scroll by default. Wrap the base `Carousel` yourself if you need timers or composed page transforms.

### Tips
- Ensure `images` is non-empty; an empty list renders a pager with zero pages.
- Provide consistent aspect ratios across slides so transitions feel smooth.
- Use `And_crsl_l` inside a container with a fixed height if you want a predictable hero size, otherwise it expands to the parent.

### Related base APIs
- `Carousel(pageCount, indicatorType, pageSpacing, ...)` - if you need additional configuration (page spacing, indicator alignment, etc.), use the base component directly.
- `CustomImageComponent` - provides advanced sizing options, placeholders, and Coil integration.
