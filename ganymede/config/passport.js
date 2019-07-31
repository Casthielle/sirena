import passport from 'passport';
import {Strategy} from 'passport-local';
import {User} from '../models';

const initPassport = () => {
  const strategy = new Strategy({usernameField: 'email'},
      async (email, password, done) => {
        const user = await User.findOne({email: email});
        if (user) {
          const match = await user.match(password);
          if (match) {
            return done(null, user, {message: 'Welcome!'});
          } else {
            return done(null, false, {message: 'Invalid password'});
          }
        } else {
          return done(null, false, {message: 'Not user found'});
        }
      });
  passport.use(strategy);
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (error, user) => {
      done(error, user);
    });
  });
};

export default initPassport;
