const express = require('express')
const router = express.Router();

const userRoutes = require('./auth/userRoutes')
const spotifyRoutes = require('./spotify/spotifyRoutes')


router.use('/auth', userRoutes)
router.use('/auth/spotify', spotifyRoutes)

module.exports = router