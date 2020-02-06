const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    RestaurantName: {
        type: String,
        min: 3,
        required: true
    },
    RestaurantLogo: {
        type:String,
        required:true
    },
    RestaurantBG: {
        type:String,
        required:true
    },
    RestaurantTags: {
        type:String,
        required:true
    },
    RestaurantLocation: {
        type:String,
        required:true
    },
    RestaurantDelivery: {
        type:String,
        required:true
    },
    Category: {
        type: mongoose.Schema.Type.ObjectId,
        ref: 'Category'
    }
})

const Category = mongoose.model('Category', CategorySchema)
module.exports = Category