const { User } = require('../models');

// just dummy data for seeding purpose no secret information 

const userData = [
    {
        name: "Joe",
        email: "joe@gmail.com",
        password: "joejoejoe"
    },
    {
        name: "Chad",
        email: "chad@gmail.com",
        password: "chadchadchad"
    },
    {
        name: "Pat",
        email: "pat@gmail.com",
        password: "patpatpat"
    }
];

const seedUsers = () => User.bulkCreate(userData)
module.exports = seedUsers;