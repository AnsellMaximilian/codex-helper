# Package: step

## Imports
```kotlin
import com.nexsoft.component.code.step.And_step_5step
```

## Component Overview
- `And_step_5step` displays a horizontal step progress indicator with labels, highlighting the active stage and marking completed steps with a check icon.
- The wrapper feeds your data into `StepComponent`, keeping spacing, colors, and accessibility semantics consistent across flows.

## Quick Start
```kotlin
@Composable
fun CheckoutSteps() {
    val steps = listOf("Cart", "Address", "Payment", "Review")
    var currentStep by rememberSaveable { mutableIntStateOf(0) }

    Column(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        And_step_5step(
            steps = steps,
            currentStep = currentStep,
            modifier = Modifier.fillMaxWidth().padding(horizontal = 24.dp)
        )

        Button(onClick = { currentStep = (currentStep + 1).coerceAtMost(steps.lastIndex) }) {
            Text("Next")
        }
    }
}
```
`currentStep` is zero-based; pass `0` for the first stage, `steps.lastIndex` for the final stage.

## Parameters
- `steps: List<String>` -> Ordered labels for each stage. The component renders one node per entry.
- `currentStep: Int = 0` -> Active index. Steps with a lower index render as completed, the current index renders as active, and higher indices remain inactive.
- `modifier: Modifier = Modifier` -> Apply width, padding, or semantics wrappers around the whole indicator.

## Supporting Types
### `StepComponent`
- Underlying base composable that exposes extra customization: `activeColor`, `inactiveColor`, and direct access to `StepState`. Use it when you need to restyle colors or embed the indicator in a custom layout.

### `StepState`
- Enum representing each node (`INACTIVE`, `ACTIVE`, `COMPLETED`). The base implementation maps indices to these states automatically based on `currentStep`.

## Usage Notes
- Supply at least two steps for meaningful feedback; the component gracefully handles longer workflows as well.
- Keep labels short (one or two words) to avoid overlapping text. For longer descriptions, pair the indicator with a separate detail panel.
- Synchronize `currentStep` with your navigation or view-model state so the indicator updates when the user progresses or backtracks.
- To change the active/completed colors, switch to `StepComponent` and override `activeColor`/`inactiveColor` to match your brand palette.
