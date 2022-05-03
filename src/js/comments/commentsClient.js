class CommentsClient {
  async fetchComments() {
    try {
			const endpoint = 'https://my-json-server.typicode.com/telegraph/frontend-exercise/comments'
			
			const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
			const data = await response.json()
			return data
		} catch (err) {
			console.error(`Could not get comments: ${err}`)
		}
  }
}

module.exports = CommentsClient;