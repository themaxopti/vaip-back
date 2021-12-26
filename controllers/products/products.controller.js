const Iqos = require('../../models/production/Iqos.production')
const Vape = require('../../models/production/Vape')
const LilSolid = require('../../models/production/LilSolid')
const Embalishment = require('../../models/production/Embalishment')
const Stick = require('../../models/production/Stick')



exports.addIqos = async (req, res) => {
    try {


        const iqos = await Iqos.find()

        res.json(iqos)

    } catch (e) {
        console.log(e)
    }
}

// Vape


exports.addVape = async (req, res) => {
    try {

        const vape = new Vape({ test: 'ddd' })
        await vape.save()

        res.json(vape)

    } catch (e) {
        console.log(e)
    }
}



exports.allVape = async (req, res) => {
    try {

        const vape = await Vape.find()

        res.json(vape)

    } catch (e) {
        console.log(e)
    }
}


// LIL SOLID


exports.addLilSolid = async (req, res) => {
    try {

        const lilSolid = new LilSolid({ test: 'ddd' })
        await lilSolid.save()

        res.json(lilSolid)

    } catch (e) {
        console.log(e)
    }
}



exports.allLilSolid = async (req, res) => {
    try {

        const lilSolid = await LilSolid.find()

        res.json(lilSolid)

    } catch (e) {
        console.log(e)
    }
}


// Embalishment

exports.addEmbalishment = async (req, res) => {
    try {

        const embalishment = new Embalishment({ test: 'ddd' })
        await embalishment.save()

        res.json(embalishment)

    } catch (e) {
        console.log(e)
    }
}



exports.allEmbalishment = async (req, res) => {
    try {

        const embalishment = await Embalishment.find()

        res.json(embalishment)

    } catch (e) {
        console.log(e)
    }
}


// Embalishment





// Sticks

exports.addSticks = async (req, res) => {
    try {

        const stick = new Stick({ test: 'ddd' })
        await stick.save()

        res.json(stick)

    } catch (e) {
        console.log(e)
    }
}



exports.allSticks = async (req, res) => {
    try {

        const stick = await Stick.find()

        res.json(stick)

    } catch (e) {
        console.log(e)
    }
}




exports.randomProduct = async (req, res) => {
    try {

        const stick = await Stick.aggregate([{ $sample: { size: 2 } }])
        const vape = await Vape.aggregate([{ $sample: { size: 2 } }])
        const iqos = await Iqos.aggregate([{ $sample: { size: 2 } }])
        const lilSolid = await LilSolid.aggregate([{ $sample: { size: 2 } }])

        const products = [...vape, ...stick, ...iqos, ...lilSolid]

        res.json(products)

    } catch (e) {
        console.log(e)
    }
}




exports.getOneProduct = async (req, res) => {
    try {

        const id = req.params.id

        const stick = await Stick.findOne({ _id: id })
        const vape = await Vape.findOne({ _id: id })
        const iqos = await Iqos.findOne({ _id: id })
        const lilSolid = await LilSolid.findOne({ _id: id })
        const embalisment = await Embalishment.findOne({ _id: id })

        if (stick) return res.json(stick)
        if (vape) return res.json(vape)
        if (iqos) return res.json(iqos)
        if (lilSolid) return res.json(lilSolid)
        if (embalisment) return res.json(embalisment)


        res.json({ message: "Такого товара не найдено" })


    } catch (e) {
        console.log(e)
    }
}