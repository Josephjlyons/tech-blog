const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        }).then(userDBData => res.json(userDBData))

    } catch (err) {
        res.status(500).json(err)
    };
});

router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['passowrd'] },
            where: {
                id: req.params.id
            },
            include: [{
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at'],
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
            {
                model: Post,
                attributes: ['title']
            }
            ]
        }).then(userDBData => {
            if (!userDBData) {
                res.status(400).json({ message: 'No user found matching this id' });
            }
            res.status(userDBData);
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/', async (req, res) => {
    try {
        const userCreate = await User.create({
            username: req.body.username,
            password: req.body.password
        }).then(userDBData => {
            req.session.save(() => {
                req.session.user_id = userDBData.id,
                    req.session.username = userDBData.username,
                    req.session.loggedIn = true;

                res.json(userDBData)
            });
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/login', async (req, res) => {
    try {
        const userLogin = await User.findOne({
            where: {
                username: req.body.username
            }
        }).then(userDBData => {
            if (!userDBData) {
                res.status(400).json({ message: 'no user found matching this id' });
                return;
            }
            const validPassword = userDBData.checkpassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'incorrect password or username!' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = userDBData.id;
                req.session.username = userDBData.username;
                req.session.loggedIn = true;

                res.json({ user: userDBData, message: 'you are now logged in!' });
            });
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        });

    } else {
        res.status(404).end();
    };
});

router.put('/:id', async (req, res) => {
    try {
        const userUpdate = await User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        }).then(userDBData => {
            if (!userDBData[0]) {
                res.status(404).json({ message: 'no user found matching this id' });
                return;
            }
            res.json(userDBData)
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const userDelete = await User.destroy({
            where: {
                id: req.params.id
            }
        }).then(userDBData =>{
            if (!userDBData) {
                res.status(404).json({message: 'no user found matching this id'});
                return;
            }
            res.json(userDBData);
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;
