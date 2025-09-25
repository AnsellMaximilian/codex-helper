# Package: banner

`com.nexsoft.component.code.banner` exposes ready-made image banners sized for hero placements, cards, and highlights. They wrap `CustomImageComponent`, so you only supply the source image while the component handles sizing, clipping, and defaults.

## Getting started
- Import the banner size you need, e.g.:
  ```kotlin
  import com.nexsoft.component.code.banner.And_bnnr_m
  ```
- Supply an `ImageSource` from `com.nexsoft.component.base.util.theme`:
  ```kotlin
  val promoImage = ImageSource.UrlImage("https://cdn.example.com/promo.jpg")
  And_bnnr_m(imageSource = promoImage)
  ```

### ImageSource options
- `ImageSource.DrawableResource(@DrawableRes resId)` - use a drawable bundled with your app.
- `ImageSource.VectorImage(ImageVector)` - render vector art.
- `ImageSource.UrlImage(String)` - load a remote image via Coil (already included with the component). Remote loads fall back to `R.drawable.ic_no_image_grey_component` on failure.

## Banner sizes `And_bnnr_*`
- Signature: `@Composable fun And_bnnr_<size>(imageSource: ImageSource? = ImageSource.DrawableResource(R.drawable.ic_no_image_grey_component))`
- Size presets:
  - `And_bnnr_s` - 160x100 dp, rounded corners; ideal for compact carousels.
  - `And_bnnr_m` - 290x160 dp, balanced for cards or two-column layouts.
  - `And_bnnr_l` - stretches to full available width (up to 328 dp) at 180 dp height; perfect for hero headers.
- Passing `null` keeps the placeholder drawable.

### Usage notes
- The component clips content with an 8.dp rounded shape; wrap it in your own container if you need additional radial or shadow effects.
- Combine with `Box` overlays to add titles or CTAs. Because the banner itself only renders the image, you can stack other composables above it.
- For accessibility, provide a descriptive `contentDescription` by wrapping `And_bnnr_*` in a parent composable that supplies semantics (e.g., via `Modifier.semantics`).
