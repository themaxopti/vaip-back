const UserService = require('../../services/userService/userService')
const { validationResult } = require('express-validator')
const User = require('../../models/User')

exports.changeUser = async (req, res) => {
    try {

        const userId = req.user.userId

        const user = await User.findOne({_id:userId})

        if(!user.isActivated){
            return res.json({message:"Активируйте аккаунт"})
        }

        const { name, email, phone, surname, father } = req.body

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Введите корректные данные'
            })
        }




        const userService = new UserService(name, email, phone, surname, father, userId)


        userService.changeUser()


        res.json({message:"Данные сохранены"})


    } catch (e) {

    }
}