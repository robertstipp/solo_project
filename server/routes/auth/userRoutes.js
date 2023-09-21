const express = require('express')
const router = express.Router()

router.post('/login', (req,res)=>{
  res.status(200).send('login')
})
router.post('/signup', (req,res)=>{
  res.status(200).send('signup')
})
router.get('/logout', (req,res)=>{
  res.status(200).send('logout')
})


module.exports = router;