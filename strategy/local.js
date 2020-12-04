const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('../models/userRegisteratio')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email,password });
            done(null,user)
        } catch (error) {
            done(error)
        }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  
  passport.deserializeUser(async (_id, done) => {
    try {
        const user = await User.findOne({ _id })
        done(null,user)
    } catch (error) {
        done(error)
    }
  });