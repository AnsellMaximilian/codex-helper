# Package: pagination

## Imports
```kotlin
import com.nexsoft.component.code.pagination.And_pgitn_dft
import com.nexsoft.component.code.pagination.And_pgitn_ctr
```

## Component Overview
- `And_pgitn_dft` shows a right-aligned pagination row with previous/next chevrons and the current range text.
- `And_pgitn_ctr` mirrors the same mechanics but centers the counter with arrows pinned to the edges, useful when the control sits inside toolbars or dense layouts.
- Both variants wrap `PaginationComponent` and keep the underlying Google-independent API hidden from callers.

## Quick Start
```kotlin
@Composable
fun HistoryPager(
    pageCount: Int,
    onPageChanged: (Int) -> Unit
) {
    var currentPage by rememberSaveable { mutableIntStateOf(1) }

    And_pgitn_dft(
        start = currentPage,
        end = pageCount,
        textColor = MaterialTheme.colorScheme.primary,
        conjunction = "of",
        back = {
            if (currentPage > 1) {
                currentPage -= 1
                onPageChanged(currentPage)
            }
        },
        next = {
            if (currentPage < pageCount) {
                currentPage += 1
                onPageChanged(currentPage)
            }
        }
    )
}
```
Set `start` back to 1 when you replace the backing list to keep the indicator in sync.

## Parameters
Both functions expose the same signature; only the visual layout changes.

- `start: Int` - Current page number shown beside the conjunction. Pass the page index you want selected by default.
- `end: Int` - Total number of pages. Must be >= `start` or the "next" button becomes permanently disabled.
- `textColor: Color` - Tint applied to the "X of Y" text; use a theme color to match surrounding UI.
- `conjunction: String` - Middle text joining the current and total counts (for example `"of"`, `"dari"`, `"/"`).
- `back: () -> Unit` - Called when the previous button is pressed. Only fires while the component can decrement.
- `next: () -> Unit` - Called when the next button is pressed. Only fires while the component can increment.

## Supporting Types
### `PaginationComponent`
- Manages an internal counter starting from `start` and provides the chevron buttons.
- Disables the chevrons at the range bounds and still triggers `back` / `next` while updating the counter.

### `PaginationType`
- `PaginationType.Default` aligns the whole control to the trailing edge (used by `And_pgitn_dft`).
- `PaginationType.Center` centers the counter with arrows at the sides (used by `And_pgitn_ctr`).

## Usage Notes
- The component manages its own internal page state via `remember`. When you need to reset it (e.g., new data set), change the `start` value or include a `key(start)` wrapper so Compose recreates the underlying state holder.
- Clamp `start` between 1 and `end` in your view-model to avoid off-by-one issues.
- Wire the callbacks to update your own paged data; the component does not fetch new content for you.
