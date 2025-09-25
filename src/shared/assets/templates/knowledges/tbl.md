# Package: table

## Imports
```kotlin
import androidx.compose.runtime.remember
import com.nexsoft.component.code.table.And_tbl_dft
import com.nexsoft.component.base.table.ActionDropdown
import com.nexsoft.component.base.table.KeyValue
import com.nexsoft.component.base.table.TableItem
import com.nexsoft.component.base.table.TableListItem
```

## Component Overview
- `And_tbl_dft` renders a two-column master list with expandable detail rows, row action menus, sorting, and built-in pagination (10 rows per page).
- The wrapper enables both dropdown details and action menus, so each row must supply `innerItems` and `actionItems`.
- Styling, pagination, and validation are handled by `TableComponent`; you only provide the data model and optional accent color.

## Quick Start
```kotlin
@Composable
fun AuditTable(onEdit: (TableListItem) -> Unit, onDelete: (TableListItem) -> Unit) {
    val rows = remember {
        List(12) { index ->
            TableListItem(
                id = index,
                bodyL = "INV-${1000 + index}",
                bodyR = "${250 + index} USD",
                innerItems = listOf(
                    KeyValue("Customer", "Acme Corp"),
                    KeyValue("Status", if (index % 2 == 0) "Paid" else "Draft")
                ),
                actionItems = listOf(
                    ActionDropdown("Edit", onEdit),
                    ActionDropdown("Delete", onDelete)
                )
            )
        }
    }

    And_tbl_dft(
        items = TableItem(
            headerL = "Invoice",
            headerR = "Amount",
            outerItems = rows
        )
    )
}
```
Sorting is enabled on both headers; pagination controls appear automatically when more than ten rows are supplied.

## Parameters
- `items: TableItem` - Complete dataset describing headers and row content.
- `baseColor: Color = MaterialTheme.colorScheme.primary` - Accent color for active rows, buttons, and pagination.

## Supporting Types
### `TableItem`
- `tableId: String` - Unique identifier (defaults to random UUID).
- `headerL`, `headerR: String` - Column headings.
- `outerItems: List<TableListItem>` - Top-level rows displayed in the table.

### `TableListItem`
- `id: Int` - Row identifier.
- `bodyL`, `bodyR: String` - Content displayed in the two columns.
- `innerItems: List<KeyValue>` - Detail lines shown when the row expands. Must be non-empty because the wrapper sets `showDropdown = true`.
- `actionItems: List<ActionDropdown>` - Menu actions surfaced via the kebab icon. Must be non-empty because the wrapper sets `showMenu = true`.
- `isExpanded: Boolean = false` - Optional flag to pre-expand rows.

### `ActionDropdown`
- `name: String` - Menu label.
- `action: (TableListItem) -> Unit` - Callback invoked when the action is chosen.

### `KeyValue`
- `key`, `value: String` - Label/value pairs rendered when the row expands.

### `TableComponent`
- Base composable providing pagination controls, sorting, validation guards, and layout.
- Additional options (for example `showDropdown`, `paginationType`) can be customised by using the base component directly.

## Usage Notes
- Ensure every row supplies non-empty `innerItems` and `actionItems`; `TableComponent` throws an `IllegalArgumentException` when either list is empty while dropdowns or menus are enabled.
- Sorting toggles between ascending, descending, and unsorted states when you tap a header label.
- Pagination shows 10 rows per page; manage external state if you need server-driven paging.
- Use stable `tableId` values when the table participates in animations or saved state restoration.
- Provide short column labels to prevent header truncation; use the expanded detail section for verbose data.
