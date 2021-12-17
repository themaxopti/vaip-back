const { Schema, model, Types } = require('mongoose')


const schema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    htmlColor:[{type:String}],
    photos:[{type:String}],
    value:{type:Number},
    color:{type:String},
    complection:{type:String}
})



module.exports = model('iqosProduct', schema) 