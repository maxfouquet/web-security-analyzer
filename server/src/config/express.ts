import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as mongoose from 'mongoose'
import * as cors from 'cors'
import * as logger from 'morgan'
import '../controllers/index.controller'
import '../controllers/sqlmap.controller'
import { RegisterRoutes } from '../routes/routes'
import * as swaggerUi from 'swagger-ui-express'
import * as path from 'path'
import config from './config'

export default function() {
    const app: express.Express = express()

    for (const model of config.globFiles(config.models)) {
        require(path.resolve(model))
    }

    if (config.useMongo) {
        mongoose
            .connect(config.mongodb, {
                promiseLibrary: global.Promise,
                useMongoClient: true,
            })
            .catch(() => {
                console.log('Error connecting to mongo')
            });
    }

    app.set('views', path.join(__dirname, '../../src/views'))
    app.set('view engine', 'pug')

    app.use(cors())
    app.use(logger('dev'))

    RegisterRoutes(app)

    try {
        const swaggerDocument = require('../../src/swagger/swagger.json')
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    } catch (err) {
        console.log('Unable to load swagger.json', err)
    }

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
    app.use(express.static(path.join(__dirname, '../../src/public')))

    app.use(
        (req: express.Request, res: express.Response, next: Function): void => {
            const err: Error = new Error('Not Found');
            next(err);
        },
    );

    return app
}
