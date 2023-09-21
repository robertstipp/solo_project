const express = require('express')
const path = require('path')
require('dotenv').config()

const app = express()

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/api',(req,res)=>{
  const data = {
    name: 'bobby'
  }

  res.status(200).json(data)
})


app.use('*', (req,res) => {
  res.status(500).send('hello')
})

module.exports = app