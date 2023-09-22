const { default: axios } = require('axios');
const express = require('express')
const router = express.Router()
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy

const User = require('../../models/userModel')

const querystring = require('querystring')
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.NODE_ENV === 'development' ? process.env.DEV_REDIRECT_URI : process.env.PROD_REDIRECT_URI

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
      .then(user=>done(null,user))
      .catch(err=>done(err))

    // Your logic to find or create a user goes here
    // const user = {/* your user object */};
    // const err = null; // replace with actual error, if any
    
    // return done(err, user);
  })
)

passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((obj,done)=>{
  console.log(obj)
  done(null,obj)
})

router.get('/passport-auth', passport.authenticate('spotify'))
router.get('/callback', passport.authenticate('spotify', {failureRedirect: '/'}),
  (req,res) => res.redirect('/')
)
router.get("/getUser",(req,res)=>{
  const sessionId =req.cookies['connect.sid']
  if (req.isAuthenticated()) {
    res.status(200).json({
      message: 'Welcome to your profile',
      user: req.user
    })
  } else {
    res.status(401).json({message: 'Unauthorized'})
  }
  console.log(sessionId)

  // res.redirect('/')
})

router.get('/refresh', async (req,res)=>{
  const refresh_token = req.cookies.refresh_token;

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }),
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  try {
    const authResponse = await axios(authOptions);
    const access_token = authResponse.data.access_token;
    // console.log('new access_token', access_token);
    res.cookie('access_token', access_token);
    res.redirect('/');
  } catch (error) {
    const err = new Error('Failed to get access token')
      err.statusCode = 400;

      err.details = error.response ? error.response.data : null;
      next(err)
  }
})


module.exports = router;