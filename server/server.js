const app = require('./app.js')
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB CONNECT 🌴 '))
  .catch(err => console.log(err))

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
  console.log(`Server running on Port ${PORT}`)
})