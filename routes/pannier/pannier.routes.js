const { Router } = require('express')
const pannierController = require('../../controllers/pannierController/pannier.controller')
const authMiddleware = require('../../middleware/auth.middleware')


const router = Router()

 

router.get('/pannier/:userId?', pannierController.getPannierUser)
router.get('/pannier/addProduct/:productId?', authMiddleware, pannierController.addProduct)
router.get('/pannier/deleteProduct/:productId?', authMiddleware, pannierController.deleteProduct)
router.get('/pannier/showPanierProducts/:panierId?', authMiddleware, pannierController.showPanierProducts)
router.get('/pannier/buyProduct', authMiddleware, pannierController.buyProduct)


module.exports = router