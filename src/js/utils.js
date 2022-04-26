/**
 * Dummy utility class to demonstrate a basic JS
 * structure and assoiciated test
 * @param {Object} params - containing:
 * @param {String} homePagePath - the pathname of the homepage (defaults to '/')
 */
class Utils {
	constructor(params) {
		this.params = Object.assign({
			homePagePath: '/'
		}, params);
		this.comments = []
		this.sortedComments = []
	}

	/**
	 * Is the user on the hompage
	 * @return {Boolean}
	 */
	isHomePage() {
		return document.location.pathname === this.params.homePagePath;
	}

	init() {
		this.addOnLoadedEventListener()
		this.addSortingButtonClickEventLister()
	}

	addOnLoadedEventListener() {
		window.addEventListener('DOMContentLoaded', this.updateComments())
	}

	async getComments() {
		try {
			const endpoint = 'https://my-json-server.typicode.com/telegraph/frontend-exercise/comments'
			
			const response = await fetch(endpoint)
			const data = await response.json()
			return data
		} catch (err) {
			console.log(err)
		}
	}

	updateComments() {
		this.getComments()
		.then(comments => {
			this.comments = comments
			comments.forEach(comment => {
				const {
					body,
					name,
					likes
				} = comment
				this.renderComment(name, body, likes)
			});
			this.sortComment()
		})
	}

	renderComment(userName, commentBody, likes) {
		const commentContainer = document.querySelector('.comments__comment-list')
		const html = `<li class="comment">
			<div class="comment__content">
				<p class="comment__user-name">${userName}</p>
				<p class="comment__content-body">${commentBody}</p>
			</div>
			<button name="likes" type="button"><span>${likes}</span> Likes</button>
		</li>`
		commentContainer.insertAdjacentHTML('beforeend', html)
	}

	addSortingButtonClickEventLister() {
		const sortingToggleButton = document.querySelector('[aria-pressed]')
		sortingToggleButton.addEventListener('click', e => {
			this.toggleSortingButton(e)
		})
	}

	toggleSortingButton(event) {
		let isPressed = event.target.getAttribute('aria-pressed') === 'true'
		event.target.setAttribute('aria-pressed', String(!isPressed))
		if (!isPressed) {
			this.renderSortedComment(this.sortedComments)
		} else {
			this.renderSortedComment(this.comments)
		}
	}

	sortComment() {
		const copiedComments = [...this.comments]
		this.sortedComments = copiedComments.sort((a,b) => b.likes - a.likes)
	}

	renderSortedComment(commentDataList) {
		const commentContainer = document.querySelector('.comments__comment-list')
		commentContainer.innerHTML = ''
		commentDataList.forEach(comment => {
			const {
				body,
				name,
				likes
			} = comment
			this.renderComment(name, body, likes)
		})
	}
}

module.exports = Utils;
