process.env.TZ = 'Asia/Jakarta'
import express, { Express } from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import morgan from 'morgan'
import { appRouterV1 } from './routes/v1'
import { APP_CONFIGS } from './configs'
import logger from './utilities/logger'
import swaggerUi from 'swagger-ui-express'
import swaggerOutput from './swagger_output.json'

const app: Express = express()

app.use(cors({ origin: true, credentials: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cookieParser())

app.use('/public', express.static('public'))

app.use(
  morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim())
    }
  })
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

appRouterV1(app)

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, content-type, Authorization, Content-Type'
  )
  next()
})

app.listen(APP_CONFIGS.port, () => {
  logger.info(`Listening on ${APP_CONFIGS.appUrl}:${APP_CONFIGS.port}`)
})
