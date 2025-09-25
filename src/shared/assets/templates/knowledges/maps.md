# Package: maps

## Imports
```kotlin
import com.nexsoft.component.code.maps.And_maps
import com.nexsoft.component.base.map.CircleOverlay
import com.nexsoft.component.base.map.CurrentRouteInfo
import com.nexsoft.component.base.map.LatLng
import com.nexsoft.component.base.map.MapCameraConfig
import com.nexsoft.component.base.map.MapController
import com.nexsoft.component.base.map.MapDetails
import com.nexsoft.component.base.map.MapMarker
import com.nexsoft.component.base.map.MapProperties
import com.nexsoft.component.base.map.MapUiSettings
import com.nexsoft.component.base.map.RouteOverlay
```

## Component Overview
- `And_maps` is a Jetpack Compose map surface built on Google Maps; it exposes overlays, stops, an optional details panel, and a route information banner without leaking Google map types.
- Use it inside Compose layouts to show delivery, routing, or point-of-interest scenarios while keeping camera control in Kotlin.

## Quick Start
```kotlin
@Composable
fun RoutePreview(
    markers: List<MapMarker>,
    stops: List<LatLng>,
    route: RouteOverlay?
) {
    var detailsVisible by remember { mutableStateOf(false) }
    var controller by remember { mutableStateOf<MapController?>(null) }

    And_maps(
        markers = markers,
        stops = stops,
        route = route,
        circle = CircleOverlay(
            center = stops.first(),
            radiusMeters = 250.0
        ),
        mapDetails = MapDetails(
            title = "Today",
            description = "3 stops remaining",
            actionText = "Details",
            onActionClick = { /* open sheet */ },
            onButtonSlide = { /* acknowledge */ }
        ),
        detailsVisible = detailsVisible,
        onDetailsVisibilityChange = { detailsVisible = it },
        currentRouteInfo = CurrentRouteInfo(
            distance = "6.2 km",
            direction = "Head north on Market St",
            estimation = "ETA 18 min"
        ),
        onMapReady = { controller = it },
        onMarkerClick = { marker -> /* highlight */ }
    )
}
```

## Parameters
- `markers: List<MapMarker>` (required) -> Callout markers rendered with labeled bubbles; may be empty when no markers are needed.
- `stops: List<LatLng>` (required) -> Ordered waypoints; intermediate stops show as dots, and the last stop is highlighted as the destination pin.
- `modifier: Modifier = Modifier` -> Compose modifier to size or position the map container.
- `route: RouteOverlay? = null` -> Optional polyline describing a route; omit for point-only scenarios.
- `circle: CircleOverlay? = null` -> Optional radius overlay drawn on top of the map.
- `initialCamera: MapCameraConfig? = null` -> Optional starting camera; specify when you need a fixed initial target/zoom instead of auto-fit.
- `autoFit: Boolean = true` -> When true, automatically adjusts the camera to fit all markers, stops, and the route once the map loads. Set to false to manage the camera yourself.
- `mapDetails: MapDetails? = null` -> Provide to show an action panel anchored to the bottom of the map; leave null to hide it entirely.
- `detailsVisible: Boolean = false` -> Controls whether the details panel is expanded. Drive this with state in your screen.
- `onDetailsVisibilityChange: (Boolean) -> Unit = {}` -> Called when the panel requests a visibility toggle (for example when the close button is tapped); update your `detailsVisible` state here.
- `currentRouteInfo: CurrentRouteInfo? = null` -> Optional banner summarizing distance, direction, and ETA above the map.
- `mapUiSettings: MapUiSettings = MapUiSettings()` -> Fine-grained toggles for built-in map UI (compass, gestures, location button, etc.).
- `mapProperties: MapProperties = MapProperties()` -> Non-UI map flags such as traffic layers and my-location.
- `onMapReady: (MapController) -> Unit = {}` -> Invoked once with a `MapController` you can keep to manipulate the camera or toggle the details panel later.
- `onMarkerClick: (MapMarker) -> Unit = {}` -> Fired when a marker bubble is tapped; handle selection, navigation, or analytics here.

## Supporting Types
### `LatLng`
- Lightweight latitude/longitude pair (`Double` values) so callers avoid depending on Google Maps types.

### `MapMarker`
- `id: String` unique key for marker state.
- `position: LatLng` geographic location.
- `text: String` label shown in the callout.
- `bg: Color = Color(0xFF4A4A4A)` background color of the callout bubble.
- `textColor: Color = Color.White` label color.

### `RouteOverlay`
- `points: List<LatLng>` path vertices (include at least two points to render a line).
- `color: Color = Color(0xFF2E7DFF)` polyline color.
- `widthPx: Float = 10f` line width in pixels.
- `geodesic: Boolean = true` draws the line following the earth's curvature.

### `CircleOverlay`
- `center: LatLng` circle origin.
- `radiusMeters: Double` radius in meters.
- `strokeColor: Color = Color(0xFF2E7DFF)` outline color.
- `fillColor: Color = Color(0x332E7DFF)` translucent fill.
- `strokeWidth: Float = 2f` outline width.

### `MapCameraConfig`
- `target: LatLng` camera focus point.
- `zoom: Float = 12f`, `tilt: Float = 0f`, `bearing: Float = 0f` describe the camera position.

### `MapDetails`
- `mainIcon: ImageVector = Icons.Default.Home` header icon.
- `title: String = ""`, `description: String = ""` text content.
- `actionText: String = "Detail"`, `actionIcon: ImageVector = Icons.Outlined.ChevronRight` trailing action UI.
- `onActionClick: () -> Unit = {}` callback when the trailing action is tapped.
- `onButtonSlide: () -> Unit = {}` callback fired when the built-in slide button completes.

### `CurrentRouteInfo`
- `distance: String`, `direction: String`, `estimation: String` -> free-form strings shown in the banner.

### `MapUiSettings`
- Compose-friendly clone of Google map UI flags. Defaults enable all UI: compass, indoor picker, toolbar, my-location button, rotation/scroll/tilt/zoom gestures, and more.

### `MapProperties`
- Toggles for underlying map data layers. Defaults disable buildings, indoor maps, traffic, and my location. `maxZoomPreference` defaults to `21f`, `minZoomPreference` to `3f`.

## MapController API
- Obtained from `onMapReady` and safe to store in state.
- `moveTo(target, zoom?, tilt?, bearing?)` instantly repositions the camera (omit values you do not want to change).
- `suspend fun animateTo(target, zoom?, tilt?, bearing?, durationMs = 800)` smoothly animates the camera; call from a coroutine scope.
- `fit(points, paddingPx = 80)` wraps the camera around a collection of points.
- `currentCamera()` returns the current `MapCameraConfig`.
- `setDetailsVisible(visible)` and `toggleDetails()` let you open or close the details panel programmatically.

## Usage Notes
- Request the usual Android location permissions before enabling `mapProperties.isMyLocationEnabled` or expecting the blue location dot.
- Keep `markers`, `stops`, and overlays stable (`remember` or state hoist them) to avoid unnecessary jumps while the map rerenders.
- When `autoFit` is true, the map animates to include all markers, stops, and route points once loading completes; switch it off if you prefer manual camera moves via `MapController`.
