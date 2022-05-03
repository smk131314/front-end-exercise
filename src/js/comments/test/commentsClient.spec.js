const CommentsClient = require('../commentsClient');
jest.mock('../commentsClient.js');

describe('CommentsClient', () => {
  const fetchComments = jest.fn(async () => [
    {
      "id": 1,
      "date": "2019-04-23T22:26:43.511Z",
      "name": "Dawud Esparza",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
      "likes": 33
    }
  ]);
  CommentsClient.mockImplementation(() => {
    return {
      fetchComments,
    };
  });

  let commentsClient;

  beforeEach(() => {
    commentsClient = new CommentsClient();
    fetchComments.mockClear();
  })

  it('should return comments object array', async () => {
    const data = await commentsClient.fetchComments();
    expect(data).toEqual([{
      "id": 1,
      "date": "2019-04-23T22:26:43.511Z",
      "name": "Dawud Esparza",
      "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed gravida orci.",
      "likes": 33
    }]);
  })

})
