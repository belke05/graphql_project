const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../.env') })


// Don't forget to set "MONGODB_URI" in ~/server/.env
const uri =
  process.env.MONGODB_URI ||
  `mongodb://localhost/please-set-process-env-mongodb-uri`

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  })

