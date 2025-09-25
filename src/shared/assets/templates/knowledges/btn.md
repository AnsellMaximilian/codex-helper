# Package

Button components are pulled from `com.nexsoft.component.code.button` package

# Naming Convention

Button components have the following naming format

And_btn_dft_<size>_ico<icon_position>_fw<full_width>_wico<with_icon>_<button_type>


Explanation:
1. size
Values: s or m or l
- s: Small
- m: Medium
- l: Large

2. icon_position:
Values: 00 or left or right
   - 00: no icon. This means the component doesn't accept an `icon`. 
   - `left`: Accepts icon means you should provide an `icon`. It will be placed on the left side of the label.
   - `right`: Accepts icon; means you should provide an `icon`. It will be place on the right side of the label.
3. full_width:
Values: 00 or 01
   - 00: it fills max width
   - 01: it doesn't fill max width
4. with_icon: Doesn't matter. It's redundant. If icon_position is 00 then it's 00 else it's 01
5. button_type:
Values: 01 or 02 or 03 or 04 or 05
   - 01: Primary
   - 02: Secondary
   - 03: Tertiary
   - 04: Link
   - 05: Slide

# Parameters
- all buttons take `label: String`
- for buttons with icons, they take `icon: ImageSource`
- all buttons take `enabled: Boolean`
- primary, secondary, tertiary, and link buttons take `onClick: () -> Unit`
- slide buttons take `onSlideComplete: () -> Unit`


# Extra Info
- `icon` parameters takes `com.nexsoft.component.base.util.theme.ImageSource`

```
sealed class ImageSource {
    data class VectorImage(val imageVector: ImageVector) : ImageSource()
    data class DrawableResource(@DrawableRes val resId: Int) : ImageSource()
    data class UrlImage(val url: String) : ImageSource()
}
```


