require('dotenv').config();
import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB';
import log from './utils/logger'
import router from './routes'


const app = express();
app.use(router)
const PORT = config.get('port')

app.listen(PORT, function() {
  log.info(`Listening on port http://localhost:${PORT} 🚀`)
  connectDB()
})
