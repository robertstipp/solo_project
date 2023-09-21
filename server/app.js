require('dotenv').config()

const express = require('express')
const path = require('path')

const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

const combinedRoutes = require('./routes/index')


// Middlewares
app.use(cookieParser());
app.use(cors())
app.use(morgan('tiny'))

// Static Build Directory
app.use('/build', express.static(path.join(__dirname, '../build')));

// Serve React App 
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});


// API
app.use('/api',combinedRoutes)


// Catch All Route
app.use('*', (req,res) => {
  res.status(200).send('catch all route')
})


// Global Error Handler
app.use((err,req,res,next)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error'
  const stack = err.stack || '';
  const details = err.detail || {};

  console.error(`[Error] ${message}`)
  console.error(stack)

  if (details) {
    console.error(`[Error-Details] ${JSON.stringify(details)}`)
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'development' ? stack : [],
    details: process.env.NODE_ENV === 'development' ? details : []
  })
})

module.exports = app