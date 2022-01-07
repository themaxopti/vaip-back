const express = require('express')

const mongoose = require('mongoose')
const Cors = require('cors')
const path = require('path')
const config = require('config')
const cookieParser = require('cookie-parser')

const app = express()

app.use(Cors({ credentials: true, origin: 'https://nosigarets.vercel.app' }))
app.use(express.json({ extended: true }))
app.use(cookieParser())

const filePathMiddleware = require('./middleware/filePath.middleware')
app.use(filePathMiddleware(path.resolve(__dirname, 'files')))

// ROUTES
app.use('/api/', require('./routes/user.routes'))
app.use('/api/', require('./routes/loginAndRegister/register.routes'))
app.use('/api/', require('./routes/loginAndRegister/login.routes'))
app.use('/api/', require('./routes/products/products.routes'))
app.use('/api/', require('./routes/pannier/pannier.routes'))
app.use('/api/', require('./routes/cookie/cookie.routes'))
app.use('/api/', require('./routes/buy/buy.routes'))
// ROUTES


app.use(express.static(__dirname + "/static"));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch (e) {
        console.log(e)
        process.exit(1)

    }
}

start()

const PORT = process.env.PORT || config.get('port')

app.listen(PORT, () => {
    console.log(`server has been started on port ${PORT}`)
})


