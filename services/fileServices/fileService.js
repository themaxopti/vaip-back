const User = require('../../models/User')
const config = require('config')


class FileService {
    constructor(){

    }
    async uploadAvatar(image) {
        try {
            console.log('===========')
            const file = image
            const avatarName = UUid.v4() + '.jpg'
            file.mv(config.get('STATIC_PATH') + '\\' + avatarName)
            return avatarName
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = FileService