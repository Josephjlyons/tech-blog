const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Comment on post 1 sample",
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: "Comment on post 2 sample",
        user_id: 2,
        post_id: 2
    },

    {
        comment_text: "Comment on post 3 sample",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData)
module.exports = seedComments;