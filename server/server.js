const app = require('./app.js')


// DB

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log(`Running on port ${PORT}`)
})