require('dotenv').config();
import express from 'express'
import config from 'config'
import connectDB from './utils/connectDB';
import log from './utils/logger'

const PORT = config.get('port')

const app = express();

app.listen(PORT, function() {
  log.info(`Listening on port http://localhost:${PORT} 🚀`)
  connectDB()
})
