import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import {config} from 'dotenv';
import passport from 'passport';
import initMongoose from './config/database';
import initPassport from './config/passport';
import {api, ssr, web} from './routes';

// Initializations
const app = express();
initMongoose();
initPassport();
config();

// Settings
app.set('port', process.env.PORT || 9001);
app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('dist'));
app.use(session({
  secret: 'ganymede',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// API
app.use('/api', api);

// WEB
app.use('/web', web);

// SSR
app.use('*', ssr);

// Start Server
app.listen(app.get('port'), () => console.log(`Server run in http://localhost:${app.get('port')}`));
