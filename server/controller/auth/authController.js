const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy
const User = require('../../models/userModel')

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.NODE_ENV === 'development' ? process.env.DEV_REDIRECT_URI : process.env.PROD_REDIRECT_URI

const authController = {};

passport.use(
  new SpotifyStrategy({
    clientID: client_id,
    clientSecret: client_secret,
    callbackURL: redirect_uri,
  },
  function (accessToken, refreshToken, expires_in, profile,done) {  
    User.findOne({spotifyId: profile.id})
      .then(user=>{
        if (user) {
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          return user.save()
        } else {
          const newUser = new User({
            displayName: profile.displayName,
            spotifyId: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken
          });
          return newUser.save()
        }
      })
      .then(user=>{
        console.log(user)
        done(null,user)
      })
      .catch(err=>{
        console.log('error', err)
        done(err)
      })
  })
)

authController.passportAuth = (req, res, next) => {
  passport.authenticate('spotify', {
    scope: [
      'user-read-email',
      'user-read-private',
      'user-top-read',
      'user-read-recently-played',
      'user-library-read'
    ],
  }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send('Unauthorized');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.isAuthenticated = true; // Setting a flag to be used later
      next(); // Proceed to the next middleware
    });
  })(req, res, next);
};

authController.callback = (req, res, next) => {
  passport.authenticate('spotify', function(err, user, info) {
    if (err) {
      // Handle error
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      // Handle failed authentication
      console.error("Authentication failed:", info);
      return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) {
        // Handle error
        console.error("Login error:", err);
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
};





module.exports = authController
