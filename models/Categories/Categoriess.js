const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    vape: [{ type: Types.ObjectId, ref: 'Vape' }],
    lilSolid: [{ type: Types.ObjectId, ref: 'LilSolid' }],
    iqos: [{ type: Types.ObjectId, ref: 'Iqos' }],
    embalishment: [{ type: Types.ObjectId, ref: 'Embalishment' }]
})



module.exports = model('Categories', schema) 