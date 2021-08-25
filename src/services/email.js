const { transporter } = require('../utils')
const logger = require('../../config/logger')
const config = require('../../config')

class EmailService {
    constructor() {
        // eslint-disable-next-line no-unused-vars
        const defaultMailOptions = {
            from: config.email.from,
            to: 'someone@yopmail.com',
            subject: 'NodeJs App',
            text: 'Hello Sir/Miss, hope you are fine. This can be a test mail.',
        }
    }

    async sendEmail(mailOptions = this.defaultMailOptions) {
        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                logger.info(error)
            } else {
                logger.info(`Email sent: ${info.response}`)
            }
        })
    }

    async signUpEmail(email, name) {
        const mailOptions = {
            from: config.email.from,
            to: email,
            subject: 'Welcome to the Project',
            text: `Hello ${name}, hope you are fine . Welcome onboard.`,
        }

        await this.sendEmail(mailOptions)
    }
}

module.exports = new EmailService()
