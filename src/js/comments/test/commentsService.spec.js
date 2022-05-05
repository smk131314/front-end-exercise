const fs = require('fs');
const path = require('path');
const homeHtml = fs.readFileSync(path.resolve(__dirname, '../../../../views/home.handlebars'), 'utf8');

const CommentsService = require('../commentsService');
const CommentsClient = require('../commentsClient');
jest.mock('../commentsClient.js');
const mockData = [
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
];

describe('CommentsService', () => {
  const fetchComments = jest.fn(async () => mockData);

  CommentsClient.mockImplementation(() => {
    return {
      fetchComments,
    };
  });

  let commentsService;

  beforeEach(() => {
    document.body.innerHTML = homeHtml; //TODO:
    commentsService = new CommentsService(new CommentsClient());
    fetchComments.mockClear();
  })

  it('is created with empty comments', () => {
    expect(commentsService.comments().length).toBe(0)
  })

  describe('Show comments', () => {
    it('display comments list when user access the homepage', async () => {
      await commentsService.handleDomContentLoaded()

      const commentItemElements = commentsService.commentContainer.children
      expect(commentItemElements.length).toBe(2)
    })

    it('each comment should show the username', async () => {
      await commentsService.handleDomContentLoaded()

      const firstUserNameElement = document.querySelector('.comment__user-name')
      expect(firstUserNameElement.textContent).toBe(mockData[0].name)
    })

    it('each comment should show the comment body', async () => {
      await commentsService.handleDomContentLoaded()

      const firstCommentBodyElement = document.querySelector('.comment__content-body')
      expect(firstCommentBodyElement.textContent).toBe(mockData[0].body)
    })

    it('each comment should show the like count', async () => {
      await commentsService.handleDomContentLoaded()

      const firstLikeCountElement = document.querySelector('.comment__like-count')
      const likeCountNumber = parseInt(firstLikeCountElement.textContent)
      expect(likeCountNumber).toBe(mockData[0].likes)
    })
  })

  // describe('Order comments by likes', () => {
  //   /*
  //   Scenario: Order comments by likes
  //     Given that I click the Likes button in the comments area
  //     Then then the comments should display in order of most likes
  //     And the comments should show most liked first
  //   */
  // })
})