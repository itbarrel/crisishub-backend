module.exports.IDGenerator = require('./IdGenerator')
module.exports.removeChars = require('./downcase')
module.exports.sequelize = require('./dbConnection')
module.exports.clStorage = require('./cl-storage')
module.exports.transporter = require('./EmailTransportor')
module.exports.plugMiddleware = require('./plugMiddleware')
module.exports.passport = require('./passport')
module.exports.pick = require('./pick')
module.exports.dynamicConnection = require('./dynamicConnection')
module.exports.umzug = require('./umzug')

module.exports.downcase = (str) => str.toLowerCase()
