const router = require('express').Router();
const { User } = require('../../models');

router.post("/", async (req, res) => {
try {
  const userData = await User.create(req.body);
  req.session.save(() => {
    req.session.logged_in = true;
    req.session.user_id = userData.id;
    res.status(200).json(userData);
  });
} catch (err) {
  res.status(500).json(err)
}
});

router.post('/session', async (req, res) => {
  try {

    const userData = await User.findOne({ where: { displayName: req.body.display_name } });

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
        .json({ message: 'Incorrect email or password, try again' });
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
 try {
   if (req.session.logged_in) {

      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;