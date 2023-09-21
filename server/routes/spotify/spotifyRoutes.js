const { default: axios } = require('axios');
const express = require('express')
const router = express.Router()

const querystring = require('querystring')

const genRandomString = (len) => {
  let text = '';
  let options =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < len; i++) {
    text += options.charAt(Math.floor(Math.random() * options.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state'
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = process.env.NODE_ENV === 'development' ? process.env.DEV_REDIRECT_URI : process.env.PROD_REDIRECT_URI
console.log(process.env.NODE_ENV)

router.get('/login', (req,res)=>{
  // const state = genRandomString
  const state = 'ABCDEFGHIJKL'
  res.cookie(stateKey, state)

  const scope = 'user-read-private user-read-email user-top-read';

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
})
router.get('/callback', async (req,res)=>{
  const code = req.query.code || null;
  const state = req.query.state || null
  const storedState = req.cookies ? req.cookies[stateKey] : null;


  if (state === null || state !== storedState) {
    res.redirect('/#' + 
      querystring.stringify({
        error: 'state_mismatch'
      }))
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
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
      const refresh_token = authResponse.data.refresh_token;
      console.log('access_token', access_token);
      res.cookie('access_token', access_token);
      res.cookie('refresh_token', refresh_token);
  
      res.redirect(
        '/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
          })
      );
    } catch (error) {
      const err = new Error('Failed to get access token')
      err.statusCode = 400;

      err.details = error.response ? error.response.data : null;
      next(err)
    }
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