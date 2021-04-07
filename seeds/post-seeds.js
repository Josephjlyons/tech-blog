const { Post } = require('../models');

const seedPosts = () => Post.bulkCreate(postData)
module.exports = seedPosts;