require('dotenv').config()
const express = require('express')
import {Express} from 'express';
const models = require('./models/models')
const sequelize = require('./db')
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app: Express = express();
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)

app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()


