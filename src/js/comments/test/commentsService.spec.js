const CommentsService = require('../commentsService');
const CommentsClient = require('../commentsClient');
jest.mock('../commentsClient.js');

describe('CommentsService', () => {
  const fetchComments = jest.fn(async () => [
    {
      id: 1,
      name: "Seungmin Kim",
      body: "🍒",
      likes: 33
    }, {
      id: 2,
      name: 'Jade Kim',
      body: '🥝',
      likes: 24
    }
  ]);

  CommentsClient.mockImplementation(() => {
    return {
      fetchComments,
    };
  });

  let commentsService;

  beforeEach(() => {
    commentsService = new CommentsService(new CommentsClient());
    fetchComments.mockClear();
  })

  it('is created with empty comments', () => {
    expect(commentsService.comments.length).toBe(0)
  })

  // describe('Show comments', () => {
  //   /*
  //   Scenario: Show comments
  //     Given that I access the homepage
  //     Then the home page should return comments
  //     And each comment should show the username
  //     And each comment should show the comment body
  //     And each comment should show the like count
  //   */
  //   it('display comments list when user access the homepage', () => {
  //   })
  //   it('each comment should show the username', () => {})
  //   it('each comment should show the comment body', () => {})
  //   it('each comment should show the like count', () => {})
  // })

  // describe('Order comments by likes', () => {
  //   /*
  //   Scenario: Order comments by likes
  //     Given that I click the Likes button in the comments area
  //     Then then the comments should display in order of most likes
  //     And the comments should show most liked first
  //   */
  // })
})