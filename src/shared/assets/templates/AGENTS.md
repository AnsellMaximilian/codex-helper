### Scope

- Your job is to understand and write/update working code.
- Your job is finished once working code as requested and within the standard has been written. You do not need to compile using ./gradlew

### How to implement features

- Place a feature under `feature.<feature name>`
- Under that package, separate view models and screens under packages of the same name, so 'viewmodel' and 'screen'
- Screens should take their respective view model as a parameter

#### View Models

- Each view model should have the `@HiltViewModel` annotation
- Provide view models with the appropriate repositories (injection)

### NexComponents

- NexComponents will be used throughout the project.
- These will be specific components like buttons, sliders, dialog, steps, stepper, etc.
- They come from the package `com.nexsoft.component`
- These components all start with `And` and uses underscore. Example: `And_btn_dft_s_ico00_fw01_wico00_01`
- These components will have a knowledge file. The second word after `And_` will tell you where the knowledge is located.
- Knowledge will be stored under `knowledges` from the root of the project. For example: `And_btn_dft_s_ico00_fw01_wico00_01`'s will be under `knowledges/btn.md`

### Navigation

- To add a new screen, add the destination under `core/navigation/Destinations.kt`
- Then add the screen to the nav graph under `core/navigation/NavGraph.kt`
- When creating screens make sure it accepts `navManager: NavigationManager` as a parameter. Use navigation manager to navigate.

### Network Interaction

#### DTOs

- DTOs for mapping return and request objects are placed inside the `data/remote/dto` folder/package
- Always ignore unknown properties

#### API interfaces

- API interfaces are placed inside `data/remote/api`. Create an API interface based on a logical group separation
- Name them based on the logical resource group. For example: `PostApi`
- Each API interface should be placed inside a file of the same name. Example: `PostApi` interface should be placed inside `PostApi.kt`

#### Interpreting Curls

- Sometimes you may get curls as an input. Whenever this happens, ignore the base domain and focus on the parts after it, such as path and query strings/params
- Try to logically group it as a resource based on the path.
- From these curls, you should create the appropriate DTOs and API interfaces
- But check if any existing files for both DTOs and API of the same logical resource group exist. And decide whether to create new files or add/update existing ones

### Local Database

- Project is already setup with room
- Place database related injections under `core/di/DatabaseModule.kt`
- Place DAOs under `data/local/dao`
- Place entities under `data/local/entity`
- Place the database and appropriate migrations under `data/local/database`
- Name the database according to the package name separated with underscore instead of dot. Example: `app_database`

### Repositories

- Repositories are for both network and local data interactions
- Place the interface under `domain/repository`
- Place the corresponding implementation inside `data/repository`
- The name of the implementation should be `<interface name>Impl`
- Repositories are where you place feature actions like `create`, `login`, etc.
- Explain each function with comments

### Modules

- The project is powered by dagger hilt
- Each logical resource group should have a module
- These modules should provide the respective APIs, repository implementations, etc.

### Models

- If necessary, place domain models inside `domain/model` and the appropriate mappers from entities or dtos, etc.
