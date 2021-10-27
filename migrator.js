require('dotenv').config()
const db = require('./db')

const migrate = async () => {
  //Connect to database
  try {
    await db.authenticate()
    console.log('Connected to database')
  } catch (err) {
    console.log('Error connecting to database', err)
    return
  }

  try {
    //reset Database
    await db.sync({ force: true })
    console.log('Database reseted')
    return
  } catch (err) {
    console.log('Database reset error', err)
  }
}

migrate()
