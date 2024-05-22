const Router = require('express')
const router = new Router()
const clothRouter = require('./clothRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/clothes', clothRouter)

module.exports = router