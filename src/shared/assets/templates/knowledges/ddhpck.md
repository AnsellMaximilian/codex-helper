# Package: datetimepicker

The datetime picker wrappers in `com.nexsoft.component.code.datetimepicker` expose wheel-style pickers for dates and times. They delegate to the base `DateWheelPicker` and `TimeWheelPicker`, setting sensible defaults.

## Date picker `And_ddhpck_datepck`
```kotlin
import com.nexsoft.component.code.datetimepicker.And_ddhpck_datepck
import java.util.Calendar

val today = Calendar.getInstance().time
val min = Calendar.getInstance().apply { add(Calendar.YEAR, -1) }.time
val max = Calendar.getInstance().apply { add(Calendar.YEAR, 1) }.time

And_ddhpck_datepck(
    date = state.selectedDate,
    onDateChange = { state.selectedDate = it },
    minDate = min,
    maxDate = max
)
```

### Parameters
- `date: Date` - currently selected value. The picker clamps it inside `minDate..maxDate` if out of range.
- `onDateChange: (Date) -> Unit` - called whenever the user settles on a new combination of day/month/year.
- `minDate: Date` / `maxDate: Date` - optional bounds limiting the selectable range.
- `modifier: Modifier` - forward additional styling (padding, width, etc.).

### Behaviour
- Locale is set to `"id"` by default; drop to the base picker if you need a different locale tag.
- Item height is fixed at 44.dp and three items are visible at a time (current value + one above/below).
- Columns snap to the nearest value; `onDateChange` fires after snapping finishes.

## Time picker `And_ddhpck_timepck`
```kotlin
And_ddhpck_timepck(
    hour = state.hour,
    minute = state.minute,
    onTimeChange = { h, m ->
        state.hour = h
        state.minute = m
    }
)
```

### Parameters
- `hour: Int` - 24h hour (0-23).
- `minute: Int` - minute (0-59).
- `onTimeChange: (hour: Int, minute: Int) -> Unit` - invoked when the selection changes.
- `modifier: Modifier` - optional styling wrapper.

### Behaviour
- Uses a 24-hour layout (`is24Hour = true`) and minute step = 1. The current minute is snapped to the nearest step.
- Wheel height is 48.dp with three visible rows, matching the design tokens.
- Values outside the supported range are coerced back into bounds before emission.

### Tips
- Keep the `Date` values in UTC+7 (or reset time components) if you store the selection without time zones; the picker normalises to midnight for the selected date.
- When pairing date and time pickers, update both in one `remember` block so state changes stay atomic.
- If you need AM/PM formatting, call `TimeWheelPicker` directly with `is24Hour = false` and render a separate column for the period.
