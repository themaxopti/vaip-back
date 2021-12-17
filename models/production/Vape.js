const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    title: { type: String },
    category: { type: String },
    description: { type: String },
    htmlColor: [{ type: String }],
    photos: [{ type: String }],
    value: { type: Number },
    color: { type: String },
    complection: { type: String },
    valueOfNikotin: { type: String },
    valueKlimoaiser: { type: String },
    weight: { type: String },
    type: { type: String },
    typeOfAutomizer: { type: String },
    amountAccamulator:{type:String},
    amountZat:{type:String},
    test:{type:String}
})



module.exports = model('vapeProduct', schema) 