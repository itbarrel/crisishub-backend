const { ColorPaletteService } = require('../../../services/resources')

const all = async (req, res, next) => {
    try {
        const { offset, limit, ...query } = req.query

        const ColorPalette = new ColorPaletteService()

        const { docs, pages, total } = await ColorPalette.all(query, offset, limit)
        res.send({ data: docs, pages, total })
    } catch (error) {
        next(error)
    }
}

const create = async (req, res, next) => {
    try {
        const ColorPalette = new ColorPaletteService()

        const ColorPaletteObj = req.body
        const colorPalette = await ColorPalette.create(ColorPaletteObj)

        res.send(colorPalette)
    } catch (error) {
        next(error)
    }
}

const show = async (req, res, next) => {
    try {
        const ColorPalette = new ColorPaletteService()

        const { id } = req.params
        const colorPalette = await ColorPalette.findById(id)

        res.send(colorPalette)
    } catch (error) {
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        const ColorPalette = new ColorPaletteService()

        const { id } = req.params
        const colorPalette = await ColorPalette.update(req.body, { id })

        res.send(colorPalette)
    } catch (error) {
        next(error)
    }
}

const destroy = async (req, res, next) => {
    try {
        const ColorPalette = new ColorPaletteService()

        const { id } = req.params
        await ColorPalette.delete({ id })
        res.send({ message: 'ColorPalette is deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    all, create, show, update, destroy,
}
