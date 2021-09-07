const passport = require('passport')

const authObj = passport.authenticate('jwt', { session: false })

module.exports = {
    authObj,
}
