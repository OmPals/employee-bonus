const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config({ path: '.env' })

app.use(express.json())
require('./config/Database')

const Auth = require('./router/auth')
app.use('/', Auth)

const Employee = require('./router/employee')
app.use('/employees', Employee)

/* 
const Shop = require('./router/shop')
app.use('/shop', Shop)

const User = require("./router/user")
app.use('/user', User)

const order = require('./router/order')
app.use('/order', order) */

// global error handler
const errorHandler = require('./helpers/error-handler');
app.use(errorHandler);


const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

const mongoose = require('mongoose')
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((data) => {
    console.log(`MongoDB is Connected On ${data.connection.host}`)
    app.listen(PORT, () => console.log(`Server is started On PORT ${PORT}`))
})
