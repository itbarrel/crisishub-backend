const nodemailer = require('nodemailer')
const config = require('../../config')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: config.email.smtp.auth,
})

module.exports = transporter
