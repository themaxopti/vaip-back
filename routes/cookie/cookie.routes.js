const { Router } = require('express')
const authMiddleware = require('../../middleware/auth.middleware')

const router = Router()


router.get('/getCookie', authMiddleware, (req, res) => {
    console.log('Cookie: ', req.cookies)
    res.send({ cookie: req.cookies })
})


router.get('/set-cookie', (req, res) => {
    res.cookie('token', '12345ABCDE', { maxAge: 3600 * 24 })
    res.send('Set Cookie')
})

module.exports = router