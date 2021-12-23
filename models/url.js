const mongoose = require('mongoose')
const shortId = require('shortid')


const urlSchema = mongoose.Schema({
    url:{type:String, required:true},
    short:{type:String, required: true, unique:true,default:shortId.generate}
})

module.exports = mongoose.model('Url', urlSchema)

