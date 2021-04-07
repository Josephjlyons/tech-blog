const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../util/auth');

router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll({})
            .then(commentDBData => res.json(commentDBData))
    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/:id', async (req, res) => {
    try {
        const commentId = await Comment.findAll({
            where: {
                id: req.params.id
            }
        }).then(commentDBData => res.json(commentDBData))
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/:id', withAuth, async (req, res) => {
    if (req.session)

        try {
            const commentId = await Comment.create({
                comment_text: req.body.comment_text,
                post_id: req.body.post_id,
                user_id: req.body.user_id
            }).then(commentDBData => res.json(commentDBData))
        } catch (err) {
            res.status(500).json(err)
        };
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentId = await Comment.update({
            comment_text: req.body.comment_text,
        },
            {
                where: {
                    id: req.params.id,
                }
            }
        ).then(commentDBData => {
            if (!commentDBData) {
                res.status(404).json({ message: 'no comment found matching this id' });
                return;
            }
            res.json(commentDBData);
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentDelete = await Comment.destroy({
            where: {
                id: req.params.id,
            }
        }).then(commentDBData => {
            if (!commentDBData) {
                res.status(404).json({ message: 'no comment found matching this id' });
                return;
            }
            res.json(commentDBData);
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;