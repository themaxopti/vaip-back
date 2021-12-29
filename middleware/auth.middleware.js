const config = require('config')
const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

// ada
module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            return res.json({message:'Вы не авторизованы'})
        }

        const decoded = jwt.verify(token,config.get('jwtSecret'))
        // console.log(decoded)

        req.user = decoded
        next()
    } catch (e) {
        return res.json({message:'Что-то пошло не так с авторизацией'})
    }

}