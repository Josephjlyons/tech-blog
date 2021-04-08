const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password'] }
        }).then(userData => res.json(userData))

    } catch (err) {
        res.status(500).json(err)
    };
});

// router.get('/:id', async (req, res) => {
//     try {
//         const userData = await User.findOne({
//             attributes: { exclude: ['password'] },
//             where: {
//                 id: req.params.id
//             },
//             include: [{
//                 model: Post,
//                 attributes: ['id', 'title', 'content', 'created_at'],
//             },
//             {
//                 model: Comment,
//                 attributes: ['id', 'comment_text', 'created_at'],
//                 include: {
//                     model: Post,
//                     attributes: ['title']
//                 }
//             },
//             {
//                 model: Post,
//                 attributes: ['title']
//             }
//             ]
//         }).then(userData => {
//             if (!userData) {
//                 res.status(400).json({ message: 'No user found matching this id' });
//             }
//             res.status(userData);
//         })
//     } catch (err) {
//         res.status(500).json(err)
//     };
// });

router.post('/', async (req, res) => {
    try {
        const userCreate = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(userCreate => {
            req.session.save(() => {
                req.session.user_id = userCreate.id,
                    req.session.name = userCreate.name,
                    req.session.loggedIn = true;

                res.json(userCreate)
            });
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
  
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
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
        }).then(userUpdate => {
            if (!userUpdate[0]) {
                res.status(404).json({ message: 'no user found matching this id' });
                return;
            }
            res.json(userUpdate)
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
        }).then(userDelete =>{
            if (!userDelete) {
                res.status(404).json({message: 'no user found matching this id'});
                return;
            }
            res.json(userDelete);
        })
    } catch (err) {
        res.status(500).json(err)
    };
});

module.exports = router;
