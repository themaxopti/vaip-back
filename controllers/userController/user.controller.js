const UserService = require('../../services/userService/userService')
const { validationResult } = require('express-validator')
const User = require('../../models/User')

exports.changeUser = async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Введите корректные данные'
            })
        }

        const userId = req.user.id

        const { name, email, phone, surname, father } = req.body

        const userService = new UserService(name, email, phone, surname, father, userId)

        await userService.changeUser()

        res.json({ message: "Данные сохранены", userName: name, userEmail: email, phone, surrname: surname, father })


    } catch (e) {

    }
}