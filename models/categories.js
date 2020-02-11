const mongoose = require('mongoose');
const CategorySchema = new mongoose.Schema({
    CategoryName:{
        type:String
    },
    CategoryImage:{
        type:String
    }
})

module.exports = mongoose.model('Categories', CategorySchema)