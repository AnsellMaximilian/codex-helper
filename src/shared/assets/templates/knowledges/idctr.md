# Package: indicator

Carousel and step indicators live in `com.nexsoft.component.code.indicator`. They wrap the base `Indicator` and `TagIndicator` helpers from `com.nexsoft.component.base.carousel`.

## Dot indicator `And_idctr_dot_1of5_bg00/bg01`
```kotlin
import com.nexsoft.component.code.indicator.And_idctr_dot_1of5_bg00

And_idctr_dot_1of5_bg00(
    count = 5,
    initialActiveIndex = 0,
    onActiveChange = { index -> pagerState.animateScrollToPage(index) }
)
```

### Parameters
- `count: Int` - total number of pages/steps. Must be > 0.
- `initialActiveIndex: Int` - starting index when the indicator manages state internally. Ignored when `activeIndex` is provided.
- `activeIndex: Int? = null` - when non-null the indicator becomes controlled; update this value to change the active dot.
- `modifier: Modifier` - optional styling.

`And_idctr_dot_1of5_bg01` is identical but applies a vertical gradient background (handy when overlaying on top of images). Use `bg00` when you do not want the gradient.

### Behaviour
- Active dot animates to a pill shape using a spring animation.
- Clicking a dot calls `onActiveChange`. If the indicator is uncontrolled (`activeIndex == null`), it updates its own internal index before invoking the callback.
- Use `activeIndex` when pairing with a `PagerState`; otherwise let the indicator manage itself for simple flows.

## Tag indicator `And_idctr_tagnumber_1of5_bg00/bg01`
Renders a pill with the current index (1-based) and total count (e.g., `3/5`).
```kotlin
And_idctr_tagnumber_1of5_bg00(count = 5, activeIndex = pagerState.currentPage)
```
- `count: Int` - total steps.
- `activeIndex: Int` - zero-based active index.
- `modifier: Modifier` - optional wrapper.

`bg01` draws the same tag but you can adjust background/border by dropping down to `TagIndicator` if necessary.

### Tips
- Ensure `activeIndex` stays within `0 until count`; the base component throws if out of range.
- Combine a dot indicator with a tag indicator when you need both visual progress and a textual summary.
- For accessibility, the base indicator sets `contentDescription` announcing active/inactive state. Wrap in additional semantics if you localise labels.

### Related base APIs
- `Indicator(...)` - exposes additional knobs such as colours, spacing, animation spec.
- `TagIndicator(...)` - allows custom text colours/border visibility.
