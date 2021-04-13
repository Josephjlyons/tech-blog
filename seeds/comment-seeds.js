const { Comment } = require('../models');

const commentData = [
    {
        comment_text: "Wow thanks for sharing... I am glad I came here to check out this post!",
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: "Huh, they sound so similiar but are so different. Who would of guessed... certainly not me.",
        user_id: 1,
        post_id: 2
    },

    {
        comment_text: "Now that I am clear on what it stands for it makes a lot more sense.",
        user_id: 1,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData)
module.exports = seedComments;