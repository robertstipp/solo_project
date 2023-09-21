const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname ,'../public')))

app.use('/home',(req,res) => {
  res.status(200).send('hello world')
})


app.use('*', (req,res) => {
  res.status(500).send('hello')
})

module.exports = app