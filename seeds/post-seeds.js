const { Post } = require('../models');

const postData = [
    {
        title: "Title For Post One",
        content: "I am the post content for post number one",
        user_id: 1
    },
    {
        title: "Title For Post Two",
        content: "I am the post content for post number two",
        user_id: 2
    },
    {
        title: "Title For Post Three",
        content: "I am the post content for post number three",
        user_id: 3
    }

];

const seedPosts = () => Post.bulkCreate(postData)
module.exports = seedPosts;