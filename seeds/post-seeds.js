const { Post } = require('../models');

const postData = [
    {
        title: "Why MVC is so important",
        content: "MVC offers support for rapid and parallel development. So, developing web applications using the MVC model it is possible that one developer work on the view while the another can work on the controller. This helps for easy implementation of the business logic of the web application.",
        user_id: 1
    },
    {
        title: "Authentication vs Authorization",
        content: "Authentication and authorization might sound similar, but they are distinct security processes in the world of identity and access management (IAM). Authentication confirms that users are who they say they are. Authorization gives those users permission to access a resource",
        user_id: 2
    },
    {
        title: "What is ORM",
        content: "Object–relational mapping in computer science is a programming technique for converting data between incompatible type systems using object-oriented programming languages. This creates, in effect, a 'virtual object database' that can be used from within the programming language.",
        user_id: 3
    }

];

const seedPosts = () => Post.bulkCreate(postData)
module.exports = seedPosts;