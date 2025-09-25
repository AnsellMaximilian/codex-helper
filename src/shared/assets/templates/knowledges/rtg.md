# Package: rating

## Imports
```kotlin
import com.nexsoft.component.code.rating.And_rtg_dft_s
import com.nexsoft.component.code.rating.And_rtg_dft_m
import com.nexsoft.component.code.rating.And_rtg_dft_l
```

## Component Overview
- `And_rtg_dft_*` exposes interactive star ratings built on the shared `RatingComponent`.
- Size suffixes scale the star diameter so you can reuse the same API across cards, dialogs, or review forms.

## Quick Start
```kotlin
@Composable
fun ReviewInput(initialRating: Float, onRatingCommitted: (Float) -> Unit) {
    var rating by rememberSaveable { mutableStateOf(initialRating) }

    And_rtg_dft_m(
        rating = rating,
        onRatingChanged = { newRating ->
            rating = newRating
            onRatingCommitted(newRating)
        }
    )
}
```
`onRatingChanged` fires every time the user taps a star, giving you a determinate rating value to store.

## Parameters
All three variants share the same signature:
- `modifier: Modifier = Modifier` - Apply padding, alignment, or sizing to the whole star row.
- `rating: Float = 0f` - Initial selected rating. Values are rounded to the nearest whole star.
- `maxRating: Int = 5` - Total number of stars displayed (1..10 works well; keep it consistent with backend expectations).
- `color: Color = MaterialTheme.colorScheme.primary` - Tint applied to filled stars. Unselected stars use gray.
- `onRatingChanged: (Float) -> Unit = {}` - Callback invoked with the tapped star index as a float.

### Size Differences
- `And_rtg_dft_s` -> 32 dp stars for compact contexts.
- `And_rtg_dft_m` -> 36 dp stars for general use.
- `And_rtg_dft_l` -> 40 dp stars for hero moments or accessibility-focused layouts.

## Supporting Types
### `RatingComponent`
- Under-the-hood implementation that manages the internal `selectedRating` state and semantics labels (`star_1_filled`, etc.). Use it directly if you need custom colors per star or a controlled `id`.

### `ComponentSize`
- Determines the star icon size in the base component. The wrappers map each suffix to the corresponding `ComponentSize` value.

## Usage Notes
- The component keeps its own `selectedRating` in `remember`. If you update `rating` from outside (e.g., loading a saved review), force a restart with `key(rating)` or by changing the composable key so the internal state reinitializes.
- Only whole-star ratings are supported. For half-star UX, call `RatingComponent` directly and extend it with custom drawing.
- Combine with `Row`/`Column` captions (e.g., "Tap to rate") and validation messaging to guide users when the rating is a required field.
- Ensure the star row is accessible: provide surrounding descriptive text or `contentDescription` on the parent if the five stars alone do not convey purpose.
