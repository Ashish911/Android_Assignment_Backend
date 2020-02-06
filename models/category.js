const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    CategoryName: {
        type: String,
        min: 3,
        required: true
    },
    CategoryImage: {
        type:String,
        required:true
    }
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category