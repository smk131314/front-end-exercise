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
		//TODO: add click event listener
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
			comments.forEach(comment => {
				const {
					body,
					name,
					likes
				} = comment
				this.renderComment(name, body, likes)
			});
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
}

module.exports = Utils;
