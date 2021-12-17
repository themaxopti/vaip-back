const { Router } = require('express')
const productController = require('../../controllers/products/products.controller')

const router = Router()


// iqos
router.get('/iqos/addIqos', productController.addIqos)
router.get('/iqos/all', productController.addIqos)
// iqos

// Vape
router.get('/vape/addVape', productController.addVape)
router.get('/vape/all', productController.allVape)
// Vape



// Lil solid
router.get('/lilSolid/addLilSolid', productController.addLilSolid)
router.get('/lilSolid/all', productController.allLilSolid)
// Lil solid



// Embalishment
router.get('/embalishment/addEmbalishment', productController.addEmbalishment)
router.get('/embalishment/all', productController.allEmbalishment)
// Embalishment



// Sticks
router.get('/sticks/addSticks', productController.addSticks)
router.get('/sticks/all', productController.allSticks)
// Sticks


router.get('/sticks/test', async (req,res) => {
    try{
        res.json({message:'Все ок'})
    }catch(e){

    }
})


// Random items
router.get('/products/random', productController.randomProduct)
// Random items


router.get('/products/:id', productController.getOneProduct)




// router.post('/avatar',)

module.exports = router