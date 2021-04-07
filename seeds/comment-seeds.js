const { Comment } = require('../models');

const seedComments = () => Comment.bulkCreate(commentData)
module.exports = seedComments;