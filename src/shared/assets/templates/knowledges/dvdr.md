# Package: divider

`com.nexsoft.component.code.divider` offers size-specific wrappers around Material3 `HorizontalDivider` and `VerticalDivider`. Each helper simply applies the design-system colour (`colorBorder`) and preset thickness.

## Horizontal dividers
- `And_dvdr_s_h` - 1.dp line.
- `And_dvdr_m_h` - 4.dp line.
- `And_dvdr_l_h` - 8.dp block divider (useful for grouping sections).

## Vertical dividers
- `And_dvdr_s_v` - 1.dp.
- `And_dvdr_m_v` - 4.dp.
- `And_dvdr_l_v` - 8.dp.

### Usage
```kotlin
import com.nexsoft.component.code.divider.And_dvdr_s_h

Column {
    Text("Billing")
    And_dvdr_s_h(Modifier.padding(vertical = 8.dp))
    Text("Shipping")
}
```

### Modifier tips
- Use `Modifier.fillMaxWidth()` or `height(...)` to control span. The wrapper does not add padding/margins.
- Combine with `Modifier.padding` to inset the divider.
- Vertical dividers need an explicit height; wrap in a `Row` and set `Modifier.height(...)` on the parent or the divider.

### Related base APIs
If you need custom colours or thickness, call `HorizontalDivider`/`VerticalDivider` directly or copy this wrapper with your own `color`/`thickness` values.
