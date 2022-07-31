require('dotenv').config();
import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB';
import log from './utils/logger'
import router from './routes'
import deserializeUser from './middleware/deserializeUser';


const app = express();

app.use(express.json())
app.use(deserializeUser)
app.use(router)
const PORT = config.get('port')
app.get('/', (req,res) => {
res.send('welcome')
})
app.listen(PORT, function() {
  log.info(`Listening on port http://localhost:${PORT} 🚀`)
  connectDB()
})
