const Utils = require('./utils');
const CommentsClient = require('./comments/commentsClient');
const CommentsService = require('./comments/commentsService')

new Utils();
const service = new CommentsService(new CommentsClient());
service.init();
