class CommentsService {
  constructor(commentClient) {
    this.commentClient = commentClient;
    this._comments = [];
    this.containerClassName = 'comments__comment-list';
    this.isInitialized = false;
  }

  comments() {
    return this._comments
  }

  get commentContainer() {
    return document.querySelector(`.${this.containerClassName}`)
  }

  get sortingToggleButton() {
    return document.querySelector('[aria-pressed]')
  }

  init() {
    this.addOnLoadedEventListener()
    this.addSortingButtonClickEventLister()
  }

  addOnLoadedEventListener() {
    window.addEventListener('DOMContentLoaded', this.handleDomContentLoaded())
  }

  handleDomContentLoaded() {
    this.commentClient
    .fetchComments()
    .then((data) => {
      this._comments = data
      this.renderCommentContainer(this._comments)
      this.isInitialized = true
    })
  }

  addSortingButtonClickEventLister() {
    this.sortingToggleButton.addEventListener('click', e => {
      this.handleToggleButtonClick(e)
		})
  }

  handleToggleButtonClick(event) {
    let isPressed = event.target.getAttribute('aria-pressed') === 'true'
		event.target.setAttribute('aria-pressed', String(!isPressed))
		if (isPressed) {
      this.renderCommentContainer(this._comments)
		} else {
      this.renderCommentContainer(this.getSortedCommentsByLikes())
		}
  }

  clearCommentContainer() {
    this.commentContainer.innerHTML = ''
  }

  getSortedCommentsByLikes() {
    if (this.isInitialized) {
      const copiedComments = [...this._comments]
      return copiedComments.sort((a,b) => b.likes - a.likes)
    }
  }

  renderCommentContainer(comments) {
    this.clearCommentContainer()
    comments.forEach(comment => {
      const {
        name,
        body,
        likes
      } = comment
      this.renderComment(name, body, likes)
    })
  }

  renderComment(userName, commentBody, likes) {
		const html = `<li class="comment">
			<div class="comment__content">
				<p class="comment__user-name">${userName}</p>
				<p class="comment__content-body">${commentBody}</p>
			</div>
			<button name="likes" type="button"><span class="comment__like-count">${likes}</span> Likes</button>
		</li>`
		this.commentContainer.insertAdjacentHTML('beforeend', html)
  }
}

module.exports = CommentsService