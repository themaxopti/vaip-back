const User = require('../../models/User')


class UserService {
    constructor(name, email, phone, surname, father, userId) {
        this.name = name,
            this.email = email,
            this.phone = phone,
            this.surname = surname,
            this.father = father
        this.userId = userId
    }

    async changeUser() {
        const user = await User.findOne({ _id: this.userId })
        if (this.name) {
            user.name = this.name
        }
        if (this.email) {
            user.email = this.email
        }
        if (this.phone) {
            user.phone = this.phone
        }
        if (this.surname) {
            user.surname = this.surname
        }
        if (this.father) {
            user.father = this.father
        }

        await user.save()

        return user

    }
}

module.exports = UserService