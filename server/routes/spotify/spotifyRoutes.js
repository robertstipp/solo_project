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

  })
)

passport.serializeUser((user,done)=>done(null,user))
passport.deserializeUser((obj,done)=>{
  console.log(obj)
  done(null,obj)
})

router.get('/passport-auth', passport.authenticate('spotify',{
  scope: ['user-read-email', 'user-read-private','user-top-read','user-read-recently-played','user-library-read', 'user-read-currently-playing']
}))
router.get('/callback', 
    passport.authenticate('spotify', {failureRedirect: '/login'}),
    (req, res) => {
        if (req.query && req.query.error) {
            // handle the error scenario
            const errorMsg = req.query.error_description || 'Unknown error';
            console.error(`Auth failed with error: ${errorMsg}`);
            return res.status(401).json({error: errorMsg});
        }
        res.redirect('/');
    }
);

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
  

})

router.get('/getMe', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Getting the access token from the authenticated user
  const accessToken = req.user.accessToken;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/getTopTracks', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Getting the access token from the authenticated user
  const accessToken = req.user.accessToken;

  try {
    const response = await axios.get('https://api.spotify.com/v1/me/top/artists', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getDailyTracks', async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // Getting the access token from the authenticated user
  const accessToken = req.user.accessToken;

  try {    
      const response = await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error, error.response ? error.response.data : '');
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/getUserProfileAnalysis', async (req,res)=>{
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const accessToken = req.user.accessToken;
  const getTracks = (offset) => {
    return axios.get(`https://api.spotify.com/v1/me/tracks?offset=${offset}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  }
  const result = []
  for (let i = 0; i < 5; i++) {
    const response = await getTracks(i*20)
    result.push(...response.data.items)
  }
  // FOR AUDIO ANALYSIS
  const trackIDs = result.map((item)=>item.track.id)
  console.log(trackIDs)
  
  try {    
    const response = await axios.get('https://api.spotify.com/v1/me/tracks', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

  
  res.status(200).json(response.data);
} catch (error) {
  console.error("Error fetching user data:", error, error.response ? error.response.data : '');
  res.status(500).json({ message: 'Internal Server Error' });
}
  

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
    console.log('new access_token', access_token);
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