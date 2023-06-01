const express =  require('express')
const dotenv = require('dotenv');
dotenv.config();
const routes = require('./routes')
const db = require('./models')
const deserializeUser = require('./middleware/deserializeUser')
const PORT = process.env.PORT || 8080
const HOST = 'localhost'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(deserializeUser)

db.sequelize.sync().then(() => {
  console.log('Database connected')
  app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
    routes(app)
  })
})