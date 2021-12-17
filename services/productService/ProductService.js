const Stick = require("../../models/production/Stick")
const Vape = require("../../models/production/Vape")
const Iqos = require("../../models/production/Iqos.production")
const LilSolid = require("../../models/production/LilSolid")
const Embalisment = require("../../models/production/Embalishment")

class ProductService {
    constructor(id) {
        this.stick = Stick
        this.vape = Vape
        this.iqos = Iqos
        this.lilSolid = LilSolid
        this.id = id
    }



    async getAllProductSchema() {
        const stick = await Stick.findOne({ _id: this.id })
        const vape = await Vape.findOne({ _id: this.id })
        const iqos = await Iqos.findOne({ _id: this.id })
        const lilSolid = await LilSolid.findOne({ _id: this.id })
        const embalisment = await Embalisment.findOne({ _id: this.id })

        if (stick) return stick
        if (vape) return vape
        if (iqos) return iqos
        if (lilSolid) return lilSolid
        if (embalisment) return embalisment
    }

}

module.exports = ProductService