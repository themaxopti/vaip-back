const config = require('config')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const authorizationHeader = req.headers.authorization



        if (!accessToken) {
            return res.status(401).json({ message: 'Вы не авторизованы' })
        }

        const decoded = jwt.verify(accessToken, config.get('jwtSecret'))

        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Что-то пошло не так с авторизацией' })
    }
}