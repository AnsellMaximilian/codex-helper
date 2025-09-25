# Package: card

The `com.nexsoft.component.code.card` package bundles common card layouts (detail lists, tappable rows, menu grids, product cards, and rich text articles). Each wrapper maps to the shared `CardComponent` base with three visual styles:
- `otd` -> outline border
- `shdw` -> shadow/elevated
- `clr` -> colored background surface

Import only what you need, e.g.:
```kotlin
import com.nexsoft.component.code.card.And_card_prdct_otd
```

## Detail cards `And_card_detail_*`
Compact key/value collections (for example profile info or order metadata).

- Signature: `@Composable fun And_card_detail_<style>(items: List<Pair<String, String>>, modifier: Modifier = Modifier, title: String? = null)`
- `items` is rendered in two-column rows (`first` = label, `second` = value).
- Optional `title` draws a bold header above the list.
- Use `modifier` to control width or padding; `CardComponent` already expands to `fillMaxWidth()`.

Example:
```kotlin
And_card_detail_shdw(
    items = userDetails,
    title = "Account information"
)
```

## List cards `And_card_list_*`
One-line actionable row with chevron. Perfect for settings or navigation lists.

- Signature: `@Composable fun And_card_list_<style>(modifier: Modifier = Modifier, title: String, onClick: () -> Unit = {})`
- Provide `onClick` to handle taps. The whole card surface is clickable.

## Menu grid cards `And_card_menu{2|3|4}row_*`
Symmetric menu tiles sized for 2, 3, or 4 items per row. Sizes correspond to `ComponentSize.LARGE`, `MEDIUM`, or `SMALL` respectively.

Shared parameters:
- `modifier: Modifier = Modifier` - position or scale the tile.
- `imageSource: ImageSource` - icon displayed at the top (`ImageSource.VectorImage`, `DrawableResource`, or `UrlImage`).
- `iconColor: Color` and `textColor: Color` - tint overrides; defaults to the subdued palette.
- `label: String` - caption under the icon.
- `onClick: () -> Unit = {}` - trigger navigations or dialogs.

Usage tips:
- Arrange cards manually inside `Row` or `FlowRow` with spacing to form the grid.
- For remote icons pass `ImageSource.UrlImage`; the helper uses `ImageSourceComponent` with Coil support.

## Product checkout cards `And_card_prdct_*`
Cart entry with checkbox, image, price, promo price, and quantity stepper.

- Signature: `@Composable fun And_card_prdct_<style>(modifier: Modifier = Modifier, title: String? = null, subtitle: String? = null, imageSource: ImageSource? = ..., price: Long, originalPrice: Long? = null, maxQty: Int = 1000, onQtyChange: (Int) -> Unit = {}, isSelected: Boolean = false, onSelectedChange: (Boolean) -> Unit = {}, onClick: () -> Unit = {})`
- `price` and `originalPrice` render with `formatRupiah` (IDR). Provide `originalPrice` to show a strike-through discount.
- `onQtyChange` receives the stepper value; clamp with `maxQty`.
- Selection checkbox wiring: set `isSelected` and mutate in `onSelectedChange` when the user toggles.

## Product showcase cards
### Landscape `And_card_prdctlandscape_*`
Wide layout with image on the left and text on the right. Includes favorite icon and optional "Promo" pill.

- Parameters: `title`, `subtitle`, `imageSource`, `price`, `originalPrice`, `isFavorite`, `onFavoriteClicked`, `isPromo`, `onClick`.
- Supports the same three surface styles via suffix.

### Portrait `And_card_prdctportrait_*`
Image stacked above the body content, ideal for grid displays. Parameters match the landscape variant.

Tips for both product cards:
- Handle favorite toggling in `onFavoriteClicked` and update `isFavorite` to reflect state.
- Use `ImageSource.UrlImage` for product photos; fallback defaults to `ic_no_image_grey_component`.

## Text feature cards `And_card_txt_*`
Hero article card with image, title, subtitle, and description, plus favorite/share buttons and optional overflow menu.

- Signature: `@Composable fun And_card_txt_<style>(modifier: Modifier = Modifier, title: String? = null, subtitle: String? = null, description: String? = null, isFavorite: Boolean = false, onFavoriteClicked: () -> Unit = {}, onShareClicked: () -> Unit = {}, actions: List<OverflowAction> = emptyList(), imageSource: ImageSource? = ...)`
- `OverflowAction` (from `com.nexsoft.component.util.data`) supplies the dropdown menu on the top-right.
- Leave `actions` empty to hide the menu but still expose share/favorite icons.

## Card base helpers
All wrappers delegate to `CardComponent` (`com.nexsoft.component.base.card`) with these key props:
- `cardStyle: CardStyle` (Color, Outline, Shadow)
- `color: Color` (used when style is `Color`)
- `padding: Dp` (defaults to 8.dp, overridden where needed)

When you outgrow the presets, call `CardComponent` directly to supply custom content while staying consistent with spacing and shapes.
