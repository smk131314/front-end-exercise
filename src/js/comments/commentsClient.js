class CommentsClient {
  async fetchComments() {
    try {
			const endpoint = 'https://my-json-server.typicode.com/telegraph/frontend-exercise/comments'
			
			const response = await fetch(endpoint)
			const data = await response.json()
			return data
		} catch (err) {
			console.log(err)
		}
  }
}

module.exports = CommentsClient;