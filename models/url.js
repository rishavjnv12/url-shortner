const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    url:{type:String, required:true},
    short:{type:String, required: true, unique:true}
})

module.exports = mongoose.model('Url', urlSchema)

