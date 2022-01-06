const { Router } = require('express')
const authMiddleware = require('../../middleware/auth.middleware')
const MailService = require('../../services/mailSevec/mailServece')

const router = Router()


router.get('/bla', authMiddleware, async (req, res) => {
    try {
        const { email } = req.user
        const mailService = new MailService()
        await mailService.sendEmailToBuy(email)
        console.log(email)
        res.json({ message: 'true' })
    } catch (e) {
        console.log(e)
    }
})







module.exports = router