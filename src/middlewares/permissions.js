// const config = require('../../config')()
// const ACL_ERROR = config.get('ACL_ERROR')
// const composeError = require('../routes/composeError')
const verifyPermission = require('../utils/verifyPermission')
const { RoleService } = require('../services/resources')
const storage = require('../utils/cl-storage')

module.exports = (permissionsToChk) => async (req, res, next) => {
    const user = storage.get('user')
    const role = await RoleService.findByQuery({ id: user.RoleId }, true)
    console.log(role)
    let granted = false

    if (permissionsToChk && permissionsToChk.length > 0) {
        granted = verifyPermission(req, permissionsToChk)

        if (granted) next()
        else return res.send({ message: 'Premission not granted' })
    } else return res.send({ message: 'Premission not granted' })
}
