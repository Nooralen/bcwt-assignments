'use strict';
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const {getUserLogin, getUser} = require('../models/userModel');
const passportJWT = require('passport-jwt');
const noclue = require('bcryptjs');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

require('dotenv').config();


// local strategy for username password login
passport.use(
  new Strategy(async (email, password, done) => {
    console.log('login creds', email, password);
    try {
      const [user] = await getUserLogin(email);
      console.log('Local strategy', user); // result is binary row
      if (user === undefined) {
        return done(null, false, {message: 'Incorrect email.'});
      }
      const login = await noclue.compare(password, user.password);
      if (!login) {
        return done(null, false, {message: 'Incorrect password.'});
      }
      // use spread syntax to create shallow copy to get rid of binary row type
      return done(null, {...user}, {message: 'Logged In Successfully'});
    } catch (err) {
      console.log('passport error', err);
      return done(err);
    }
  })
);

// TODO: JWT strategy for handling bearer token
// consider .env for secret, e.g. secretOrKey: process.env.JWT_SECRET
passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_KEY,
    },
    async (jwtPayload, done) => {
      // Get user data from DB using userModel 
      console.log('user from token', jwtPayload);
      try {
        const user = await getUser(jwtPayload.user_id);
        return done(null, user);
      } catch (error) {
        return done(error);
      }
      // (or extract data from token, note: user data in token might be outdated) 
      // return done(null, jwtPayload);

    }
  )
);

module.exports = passport;