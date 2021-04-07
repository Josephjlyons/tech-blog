const { User } = require('../models');



const seedUsers = () => User.bulkCreate(userData)
module.exports = seedUsers;