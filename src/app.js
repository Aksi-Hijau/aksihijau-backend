const express =  require('express')
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const routes = require('./routes')
const db = require('./models')
const deserializeUser = require('./middleware/deserializeUser')
const PORT = process.env.PORT || 3000
const HOST = 'localhost'

const app = express()

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(deserializeUser)

db.sequelize.sync().then(() => {
  console.log('Database connected')
  app.listen(PORT, () => {
    console.log(`Server running at http://${HOST}:${PORT}`)
    routes(app)
  })
})
