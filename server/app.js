require('dotenv').config()

const express = require('express')
const session = require('express-session')
const path = require('path')
const morgan = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const passport = require('passport')

const combinedRoutes = require('./routes/index')



const app = express()

// Middlewares
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:8000', credentials: true }));
app.use(morgan('tiny'))

app.use(
  session({secret: 'just bobby', resave: true, saveUninitialized: true})
)


// Passport
app.use(passport.initialize())
app.use(passport.session())




// Static Build Directory
app.use('/build', express.static(path.join(__dirname, '../build')));


// Serve React App 
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use('/fonts', express.static(path.join(__dirname, '../public/fonts')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));



// API
app.use('/api',combinedRoutes)

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
    console.error(`[Error-Details] ${JSON.stringify(details)} 🧨`)
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'development' ? stack : [],
    details: process.env.NODE_ENV === 'development' ? details : []
  })
})

module.exports = app