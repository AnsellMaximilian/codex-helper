# Package: post

## Imports
```kotlin
import com.nexsoft.component.code.post.And_post_img_trunc01
import com.nexsoft.component.code.post.And_post_txt_trunc01
import com.nexsoft.component.code.post.And_post_repost_trunc01
import com.nexsoft.component.code.post.And_postcomm_comm
import com.nexsoft.component.code.post.And_postcomm_repl
import com.nexsoft.component.base.util.theme.ImageSource
```

## Component Overview
- `And_post_img_trunc01` renders a feed card with author header, hero image, truncated body text, and social actions.
- `And_post_txt_trunc01` matches the layout without an image for text-only updates.
- `And_post_repost_trunc01` nests a secondary post preview inside the card so you can show shared content alongside the sharer->s caption.
- `And_postcomm_comm` displays a top-level comment row with reply and like actions.
- `And_postcomm_repl` is a condensed reply style aligned beneath its parent comment.

## Quick Start
```kotlin
@Composable
fun PostFeed(posts: List<PostUiModel>) {
    LazyColumn(verticalArrangement = Arrangement.spacedBy(16.dp)) {
        items(posts) { post ->
            when (post) {
                is PostUiModel.Text -> And_post_txt_trunc01(
                    authorName = post.author,
                    publishedDate = post.publishedAt,
                    content = post.caption,
                    totalLikes = post.likes,
                    totalComments = post.comments,
                    onClickLike = { post.onLike() },
                    onClickComment = { post.onComment() },
                    onClickShare = { post.onShare() },
                    onClickViewComments = { post.onViewComments() }
                )
                is PostUiModel.Image -> And_post_img_trunc01(
                    authorName = post.author,
                    publishedDate = post.publishedAt,
                    content = post.caption,
                    postImage = ImageSource.UrlImage(post.imageUrl),
                    totalLikes = post.likes,
                    totalComments = post.comments,
                    onClickLike = { post.onLike() },
                    onClickComment = { post.onComment() }
                )
                is PostUiModel.Repost -> And_post_repost_trunc01(
                    authorName = post.author,
                    publishedDate = post.publishedAt,
                    content = post.caption,
                    totalLikes = post.likes,
                    totalComments = post.comments,
                    repostAuthorName = post.originalAuthor,
                    repostPublishedDate = post.originalPublishedAt,
                    repostContent = post.originalCaption,
                    repostImage = post.originalImage?.let(ImageSource::UrlImage)
                        ?: ImageSource.DrawableResource(R.drawable.ic_no_image_grey_component),
                    onClickViewComments = { post.onViewComments() }
                )
            }
        }
    }
}
```
`publishedDate` expects a `java.util.Date`; format conversions happen inside the component so pass real timestamps from your domain layer.

## Post Variants
### `And_post_img_trunc01`
- `authorName: String` -> Primary author label.
- `publishedDate: Date` -> Used to render the relative timestamp.
- `content: String` -> Caption text truncated to fit the feed. Long bodies expand on tap via the built-in ->See more/less->.
- `modifier: Modifier = Modifier` -> Wrap with padding, width constraints, or click semantics.
- `postImage: ImageSource = ImageSource.DrawableResource(R.drawable.ic_no_image_grey_component)` -> Hero media. Provide a vector, drawable, or URL (see **ImageSource**).
- `totalLikes: Int = 0` / `totalComments: Int = 0` -> Counts mirrored in the action row and footer.
- `onClickLike`, `onClickComment`, `onClickShare`, `onClickViewComments` -> Hook into your interaction handlers. Buttons call these without any additional state management.

### `And_post_txt_trunc01`
Same signature as the image variant but omits the media slot. Ideal for announcements or text-only updates.

### `And_post_repost_trunc01`
Adds the following on top of the base post parameters:
- `repostAuthorName: String`, `repostPublishedDate: Date` -> Details for the embedded post preview.
- `repostContent: String` -> Text shown inside the inset card (truncated with ellipsis).
- `repostImage: ImageSource = ImageSource.DrawableResource(R.drawable.ic_no_image_grey_component)` -> Optional media for the original post.
The outer card still exposes the standard social callbacks so you can track engagement for the share itself.

## Comment Components
### `And_postcomm_comm`
- `authorName: String`, `publishedDate: Date`, `content: String` -> Comment header and body.
- `totalLikes: Int = 0` -> Displays the like count and controls the heart state.
- `totalReplies: Int = 0` -> When greater than zero, shows ->See X more replies->.
- `onClickLike`, `onClickSeeMoreReplies`, `onClickReply`, `onClickAuthor` -> Callback hooks for the respective actions.

### `And_postcomm_repl`
- Mirrors the `And_postcomm_comm` arguments (minus callbacks) but renders in the condensed reply style. Use for nested threads or inline replies.

## Supporting Types
### `ImageSource`
Sealed type used across the component library to describe imagery.
- `ImageSource.VectorImage(imageVector: ImageVector)` -> Provide Compose vectors such as `Icons.Default.*`.
- `ImageSource.DrawableResource(@DrawableRes resId: Int)` -> Reference packaged assets in `res/drawable`.
- `ImageSource.UrlImage(url: String)` -> Load remote media; ensure your app-level image loader is wired to handle it.

### Dates and Formatting
All timestamps use `java.util.Date`. The post header formats them into a readable date string, while comments display relative time (e.g., ->2h ago->). Supply real `Date` instances converted from your backend epoch times.

## Usage Notes
- These wrappers manage internal truncation (140 characters) and expandable text. Keep your content plain text; markdown or HTML should be preprocessed before passing it in.
- Provide stable callback lambdas when wiring into `LazyColumn` to avoid unnecessary recomposition.
- The optional image placeholder defaults to a grey illustration. Override with brand imagery or remote URLs as needed.
- For advanced layouts (adding badges, toggling `isLiked`, or showing avatars), drop down to `PostComponent`/`CommentComponent` from `com.nexsoft.component.base.post` where you can construct `PostData`/`CommentData` manually.
