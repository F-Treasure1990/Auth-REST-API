import logger from 'pino'
import dayjs from 'dayjs'
import config from 'config'

const level = config.get<string>('logLevel')

export default logger({
  transport: {
    target: 'pino-pretty'
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time" :"${dayjs().format()}"`,
})

