const { Router } = require('express')

const router = Router()
const userController = require('../controllers/userController/user.controller')
const authMiddleware = require('../middleware/auth.middleware')
const { check } = require('express-validator')


router.post('/changeUser', authMiddleware, [
    check('email', 'Введите корректный емейл').normalizeEmail().isEmail(),
    check('phone', 'Введите корректный телефон').isInt().isLength({ max: 15, min: 3 })
]
    , userController.changeUser)


module.exports = router