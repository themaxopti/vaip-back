const { Router } = require('express')

const router = Router()
const mongoose = require('mongoose')
const loginController = require('../../controllers/loginAndRegisterControllers/login.controller')
const authMiddleware = require('../../middleware/auth.middleware')
const { check } = require('express-validator')
    
router.post(
    '/login',
    [
        check('email', 'Введите корректный емейл').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    loginController.login
)

router.get('/auth',authMiddleware,loginController.auth)

module.exports = router