const { Router } = require('express')

const router = Router()
const mongoose = require('mongoose')
const registerController = require('../../controllers/loginAndRegisterControllers/register.controller')

const { check } = require('express-validator')

router.post(
    '/register',
    [
        check('email', 'Некорректный емейл').isEmail(),
        check('name', 'Минимальная длина имя 2 символа').isLength({ min: 2 }),
        check('password', 'Минимальная длина пароля 4 символа').isLength({ min: 4 }),
    ],
    registerController.register
)

router.get('/activate/:link?',registerController.activateLink)

module.exports = router