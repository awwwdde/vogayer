const uuid = require('uuid')
const path = require('path');
const {Cloth, ClothInfo} = require('../models/models')
const ApiError = require('../Error/ApiError');

class clothController {
    async create(req, res, next) {
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const cloth = await Cloth.create({name, price, brandId, typeId, img: fileName});

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ClothInfo.create({
                        title: i.title,
                        description: i.description,
                        clothId: cloth.id
                    })
                )
            }

            return res.json(Cloth)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let clothes;
        if (!brandId && !typeId) {
            clothes = await Cloth.findAndCountAll({limit, offset})
        }
        if (brandId && !typeId) {
            clothes = await Cloth.findAndCountAll({where:{brandId}, limit, offset})
        }
        if (!brandId && typeId) {
            clothes = await Cloth.findAndCountAll({where:{typeId}, limit, offset})
        }
        if (brandId && typeId) {
            clothes = await Cloth.findAndCountAll({where:{typeId, brandId}, limit, offset})
        }
        return res.json(clothes)
    }

    async getOne(req, res) {
        const {id} = req.params
        const cloth = await Cloth.findOne(
            {
                where: {id},
                include: [{model: ClothInfo, as: 'info'}]
            },
        )
        return res.json(cloth)
    }
}

module.exports = new clothController()