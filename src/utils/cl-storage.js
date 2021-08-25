const { createNamespace, getNamespace } = require('cls-hooked')

createNamespace('crisishub')
const storage = getNamespace('crisishub')

module.exports = storage
