const Panier = require('../../models/Pannier/Panier')
const ProductService = require('../../services/productService/ProductService')

exports.getPannierUser = async (req, res) => {
    try {
        const { userId } = req.params

        const panier = await Panier.findOne({ userId })

        res.json(panier)

    } catch (e) {
        console.log(e)
    }
}



exports.addProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const productService = new ProductService(productId)
        const checkedProduct = await productService.getAllProductSchema()
        console.log(checkedProduct)
      
      
        if (!checkedProduct) return res.json({ message: "Такого товара нету в базе" })

        const userId = req.user.id

        const isPanier = await Panier.findOne({ userId, products: { $eq: productId } })

        if (isPanier) return res.json({ message: "Такой товар в корзине уже есть" })

        const countProduct = +checkedProduct.value

        const panier = await Panier.findOneAndUpdate({ userId }, { $push: { products: checkedProduct }, $inc: { totalCount: countProduct } }, { new: true })

        console.log(panier)

        res.json(panier)

    } catch (e) {
        console.log(e)
    }
}





exports.deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const productService = new ProductService(productId)
        const checkedProduct = await productService.getAllProductSchema()

        if (!checkedProduct) return res.json({ message: "Такого товара нету в базе" })

        const userId = req.user.id

        const isPanier = await Panier.findOne({ userId, products: { $eq: productId } })

        // if(!isPanier) return res.json({message:"Такого товара нет в корзине"})


        const countProduct = checkedProduct.value

        const panier = await Panier.findOneAndUpdate({ userId }, { $pull: { products: checkedProduct }, $inc: { totalCount: -countProduct } }, { new: true })



        console.log(panier)

        res.json(panier)

    } catch (e) {
        console.log(e)
    }
}







exports.showPanierProducts = async (req, res) => {
    try {
        const { panierId } = req.params

        const productService = new ProductService(panierId)
        const checkedProduct = await productService.getAllProductSchema()

        if (!checkedProduct) return res.json({ message: "Такого товара нету в базе" })

        const userId = req.user.userId

        const isPanier = await Panier.findOne({ userId, products: { $eq: panierId } })

        if(!isPanier) return res.json({message:"Такого товара нет в корзине"})


        const countProduct = checkedProduct.value

        const panier = await Panier.findOneAndUpdate({ userId }, { $pull: { products: panierId }, $inc: { totalCount: -countProduct } }, { new: true })



        console.log(panier)

        res.json(panier)

    } catch (e) {
        console.log(e)
    }
}