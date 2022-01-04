const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const User = require('../../models/User')
const jwt = require('jsonwebtoken')
const config = require('config')
const tokenService = require('../../services/token-service')
const UserDto = require('../../dtos/user-dto')


exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные входе'
            })
        }

        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            return res.body({
                message: "Пользователь не найден"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.json({
                message: "Пользователь не найден"
            })
        }

 
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true,secure:true,sameSite: 'none' })


        res.json({
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            father: user.father,
            phone: user.phone,
            orders: user.orders,
            totalCount: user.totalCount
        })

    } catch (e) {
        console.log(e)
    }
}


exports.auth = async (req, res) => {
    try {
        const userId = req.user.userId

        const user = await User.findOne({ _id: userId })

        if (!user) {
            return res.status(400).json({ message: 'Пользователь не найден' })
        }


        res.json({
            token: req.cookies,
            userId: user.id,
            userName: user.name,
            userEmail: user.email,
            father: user.father,
            phone: user.phone,
            orders: user.orders,
            totalCount: user.totalCount
        })

    } catch (e) {
        console.log(e)
    }
}





exports.logOut = async (req, res) => {
    try {
        const { refreshToken } = req.cookies
        const token = await tokenService.removeToken(refreshToken)
        res.clearCookie('refreshToken')

        res.json({
            token
        })

    } catch (e) {
        console.log(e)
    }
}




exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.cookies

        if (!refreshToken) {
            return res.status(401).json({ message: 'Вы не авторизованы', cookie: req.cookies })
        }

        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            return res.json('Вы не авторизованы')
        }

        const user = await User.findById(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({ ...userDto })
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        res.cookie('refreshToken', tokens.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true,secure:true,sameSite: 'none'  })

        res.json({
            message: 'Токен перезаписан',
            accessToken: tokens.accessToken,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            surrname:user.surname,
            father: user.father,
            phone: user.phone,
            orders: user.orders,
            totalCount: user.totalCount
        })

    } catch (e) {
        console.log(e)
    }
}
