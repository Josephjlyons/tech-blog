const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../util/auth');

router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll({
            attributes: ['id', 'title', 'content', 'created_at'],
            order: [
                ['created_at', 'DESC'],
            ],
            include: [{
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]
        }).then(postDBData => {
            res.json(postDBData.reverse())
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/:id', async (req, res) => {
    try {
        const postId = await Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'content', 'title', 'created_at'],
            include: [{
                module: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
            ]

        }).then(postDBData => {
            if (!postDBData) {
                res.status(404).json({ message: 'no post found matching this id' });
            }
            res.json(postDBData)
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/', withAuth, async (req, res) => {
    try {
        const post = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        }).then(postDBData => res.json(postDBData))
    } catch (err) {
        res.status(500).json(err)
    };
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const postUpdate = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id
                }

            }).then(postDBData => {
                if (!postDBData) {
                    res.status(404).json({ message: 'no post found matching that id' });
                    return;
                }
                res.json(postDBData)

            })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postDelete = await Post.destroy({
            where: {
                id: req.params.id
            }
        }).then(postDBData => {
            if (!postDBData) {
                res.status(404).json({ message: 'no post found matching that id' });
                return;
            }
            res.json(postDBData)
        })
    } catch (err) {
        res.status(500).json(err)
    };
});


module.exports = router;