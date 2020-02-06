const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
    FoodName: {
        type:String,
        min:3,
        trim:true
    },
    FoodImage: {
        type:String,
        required:true
    },
    Category: {
        type:String,
    },
    Price: {
        type:Number,
        required:true,
        minlength:1,
        trim:true
    }
})

const Food = mongoose.model('Food', FoodSchema);
module.exports = Food