const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
   userId:{type:Types.ObjectId},
   totalCount:{type:Number,default:0},
   products:[{type:Object}],
   userName:{type:String}
})



module.exports = model('panier', schema) 