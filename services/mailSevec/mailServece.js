const config = require("config");
const nodemailer = require("nodemailer");



class MailService {
    // constructor() {
    //     this.testEmailAccount = nodemailer.createTestAccount()
    //     this.transporter = nodemailer.createTransport({
    //         host: 'smtp.ethereal.email',
    //         port: 587,
    //         secure: false, // true for 465, false for other ports
    //         service: 'gmail',
    //         auth: {
    //             user: this.testEmailAccount.user, // generated ethereal user
    //             pass: this.testEmailAccount.pass, // generated ethereal password
    //         }
    //     })
    // }


    async sendEmail(to, link) {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
            auth: {
                user: config.get('SMTP_USER'),
                pass: config.get('SMTP_PASSWORD'),
            },
        })

        let result = await transporter.sendMail({
            from: 'tes@gmail.com',
            to,
            subject: 'Письмо для подтверждения аккаунта',
            text: `Здравствуйте ${to} ,пожалуйста, подтвердите свой аккаунт`,
            html:
                `
                    Здравствуйте, ${to} ,пожалуйста, подтвердите свой аккаунт.
                        Письмо для подтверждения аккаунта:<br />
                        <a href="${link}">${link}</a>                     
                `,
        }).catch(e => console.log(e))

        console.log(result)
    }



    async sendEmailToBuy(to) {

        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            service: 'gmail',
            tls: {
                // do not fail on invalid certs
                rejectUnauthorized: false
            },
            auth: {
                user: config.get('SMTP_USER'),
                pass: config.get('SMTP_PASSWORD'),
            },
        })

        let result = await transporter.sendMail({
            from: 'tes@gmail.com',
            to,
            subject: 'Информация о покупке товара',
            text: `Здравствуйте ${to} ,пожалуйста, подтвердите свой аккаунт`,
            html:
                `
                Здравствуйте, ${to}, магазин находится в стадии разработки,поэтому покупки на ближайшее время не доступны.
                        <br />
                        Спасибо за понимание.
                `,
        }).catch(e => console.log(e))

        console.log(result)
    }
}

module.exports = MailService