# Package: buttonpwa

`com.nexsoft.component.code.buttonpwa` contains preconfigured partner login buttons. The GroChat set wraps the GroChat brand mark, copy, and chevron into responsive outlined buttons so you can drop in a consistent SSO entry point.

## Getting started
- Import the size you need:
  ```kotlin
  import com.nexsoft.component.code.buttonpwa.And_btnGrochat_m
  ```
- Place the button inside your Compose tree and pass a handler for the GroChat login flow:
  ```kotlin
  And_btnGrochat_m(onClick = { viewModel.onGroChatLogin() })
  ```

### Naming convention
- `And_btnGrochat_s` | `m` | `l` indicates the height: 32 dp, 40 dp, or 48 dp.
- The content is fixed: GroChat logo on the left, "Login with GroChat" text, and a chevron icon on the right.

## Shared API
All three variants expose the same signature:

- `@Composable fun And_btnGrochat_<size>(modifier: Modifier = Modifier, onClick: () -> Unit = {})`
- `modifier` lets you chain additional layout behavior (padding, width constraints, semantics). The internal button already calls `fillMaxWidth()`.
- `onClick` receives the tap event. Trigger your sign-in, deep link, or analytics here.

### Behavior notes
- The components use `OutlinedButton` with a 1 dp border and 8 dp corner radius to meet GroChat brand guidance.
- The logo comes from `R.drawable.grochat_logo` and is tinted `Color.Unspecified` so the original colors show. Override the asset at the resource level if your theme requires an alternate mark.
- Text styles scale with the size variant: large uses `bodyLarge`, medium uses `bodyMedium`, small uses `bodySmall`, all bold.
- Because the label and icons are embedded, you only control placement and click handling. For different copy or icons use `ButtonComponent` directly.
