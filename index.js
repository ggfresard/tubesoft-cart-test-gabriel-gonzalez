require('dotenv').config()
const express = require('express')
const path = require('path')
const cors = require('cors')
const db = require('./db')
const router = require('./routes/router')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json())
app.use(cors())

//Api routes
app.use('/api', router)

//Define static directory
app.use(express.static(path.join(__dirname, 'client/build')))
//Serve Client
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
)

//Init process
const init = async () => {
  var retries = 5

  while (retries) {
    try {
      //Verify Database Connection
      await db.authenticate()
      console.log('Connected to database')
      break
    } catch (error) {
      retries -= 1
      if (retries) {
        console.log(`Retrying to connect to database, attempt :${5 - retries}`)
        await new Promise((res) => setTimeout(res, 5000))
      } else {
        console.log("Couldn't connect to database", error)
        return
      }
    }
  }
  await db.sync({ force: true })
  //Start express app
  app.listen(PORT, () => console.log(`App running on port ${PORT}`))
}

init()
