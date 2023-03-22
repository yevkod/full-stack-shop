import { Request, Response } from 'express';
const {Brand} = require('../models/models')
const ApiError =  require('../error/apiError')

class BrandController {
    async create(req: Request, res: Response) {
        const {name} = req.body
        const brand = await Brand.create({name})
        return res.json(brand)
    }

    async getAll(req: Request, res: Response) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

}

module.exports = new BrandController()