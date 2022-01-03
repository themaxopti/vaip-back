const jwt = require('jsonwebtoken')
const config = require('config')
const tokenModel = require('../models/Token/token-model')


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '15s' })
        const refreshToken = jwt.sign(payload, 'refresh', { expiresIn: '30d' })
        return {
            accessToken, refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({ user: userId })
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        const token = await tokenModel.create({ user: userId, refreshToken })
        return token
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, config.get('jwtSecret'))
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, 'refresh')
            return userData
        } catch (e) {
            return null
        }
    }

    async removeToken(refreshToken) {
        const tokenData = await tokenModel.deleteOne({ refreshToken })
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await tokenModel.findOne({ refreshToken })
        return tokenData
    }

   
}

module.exports = new TokenService()