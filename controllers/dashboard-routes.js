const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../util/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const dashboard = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['id', 'title', 'content', 'created_at'],
            include: [{
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
            ]
        }).then(postDBData => {
            const post = postDBData.map(post => post.get({ plain: true }));
            res.render('dashboard', { post, loggedIn: true })
        })

    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const dashboard = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['title', 'content', 'created_at'],
            include: [{
                model: User,
                attributes: ['name'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['name']
                }
            }
            ]
        }).then(postDBData => {
            if (!postDBData) {
                res.status(404).json({ message: 'no post found matching this id' });
                return;
            }
            const post = postDBData.get({ plain: true });
            res.render('edit-post', { post, loggedIn: true });
        })

    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;