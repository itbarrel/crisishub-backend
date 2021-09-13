const storage = require('../../utils/cl-storage')

class AccountResourceService {
    constructor(model) {
        this.model = model
    }

    async all(query = {}, offset = 0, limit = 20) {
        const account = storage.get('account') || { id: 0, tenant_name: 'public' }

        return this.model.schema(account.tenant_name).findAll({
            limit,
            offset: offset * (limit + 1),
            where: query,
        })
    }

    async create(obj = {}) {
        const account = storage.get('account') || { id: 0, tenant_name: 'public' }

        return this.model.schema(account.tenant_name).create(obj)
    }

    async findById(id) {
        const account = storage.get('account') || { id: 0, tenant_name: 'public' }
        return this.model.byId(id, account.tenant_name)
    }

    async findByQuery(
        query = {},
        single = true,
        attribs = Object.keys(this.model.tableAttributes),
        include = [],
        offset = 0,
        limit = 20,
    ) {
        const account = storage.get('account') || { id: 0, tenant_name: 'public' }

        let attributes = attribs
        if (!(attributes instanceof Array)) {
            attributes = Object.keys(this.model.tableAttributes)
        }

        const fullQuery = {
            where: query, attributes, include, offset, limit,
        }

        return single
            ? this.model.schema(account.tenant_name).findOne(fullQuery)
            : this.model.schema(account.tenant_name).findAll(fullQuery)
    }

    async update(obj = {}, query = {}) {
        const account = storage.get('account') || { id: 0, tenant_name: 'public' }

        const updated = await this.model.schema(account.tenant_name).update(obj, {
            where: query,
            validate: true,
            sideEffects: true,
            paranoid: true,
            returning: true,
        })
        if (!updated[1][0]) {
            throw new Error(`${this.model.name} not found.`)
        }
        return updated[1][0]
    }

    async delete(query = {}) {
        const account = storage.get('account') || { id: 0, tenant_name: 'public' }

        const result = await this.model.schema(account.tenant_name).destroy({ where: query })
        if (!result) {
            throw new Error(`${this.model.name} not found.`)
        }
    }
}

module.exports = AccountResourceService
