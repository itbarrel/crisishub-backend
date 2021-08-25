module.exports.IDGenerator = require('./IdGenerator')
module.exports.removeChars = require('./downcase')
module.exports.sequelize = require('./dbConnection')
module.exports.clStorage = require('./cl-storage')
module.exports.transporter = require('./EmailTransportor')
module.exports.plugMiddleware = require('./plugMiddleware')

module.exports.downcase = (str) => str.toLowerCase()
