const express =  require('express')
const routes = require('./routes')
const db = require('./models')

const PORT = 9000
const HOST = 'localhost'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

db.sequelize.sync().then(() => {
  console.log('Database connected')
  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
    routes(app)
  })
})