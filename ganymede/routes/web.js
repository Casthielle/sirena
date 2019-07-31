import {Router} from 'express';
import {validator} from '../middlewares';
import {User} from '../models';
import passport from 'passport';
import Token from '../helpers/token';

const router = new Router();

const authRules = {
  email: ['required', 'email'],
  password: ['required'],
};

router.post('/login',
    validator.check(authRules),
    passport.authenticate('local'),
    (req, res) => {
      const {user} = req;
      const token = Token.create(user);
      res.status(200).json({user, token});
    });

router.get('/logout', async (req, res) => {
  await req.logOut();
  res.status(200).send({status: 'offline'});
});

router.post('/register', validator.check(authRules), async (req, res) => {
  const {email} = req.body;
  let user = await User.findOne({email: email});
  if (user) {
    res.status(400).json({
      error: true,
      errors: ['this email is already registered'],
    });
  } else {
    user = new User(req.body);
    await user.encrypt();
    await user.save();
    const token = Token.create(user);
    res.status(200).json({user, token});
  }
});


export default router;
