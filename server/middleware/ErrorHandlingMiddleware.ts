import { Request, Response } from 'express';
const ApiError = require('../error/apiError')

module.exports = function (err:any, req: Request, res: Response, next:any ) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
}
