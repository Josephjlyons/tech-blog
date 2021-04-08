const { User } = require('../models');

// just dummy data for seeding purpose no secret information 

const userData = [
    {
        username: "Joe",
        password: "joejoejoe"
    },
    {
        username: "Chad",
        password: "chadchadchad"
    },
    {
        username: "Pat",
        password: "patpatpat"
    }
];

const seedUsers = () => User.bulkCreate(userData)
module.exports = seedUsers;