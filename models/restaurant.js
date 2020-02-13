const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({

    RestaurantName: {
        type: String,
        min: 3,
        required: true
    },
    Logo: {
        type:String,
        required:true
    },
    Tags: {
        type:String,
        required:true
    },
    Location: {
        type:String,
        required:true
    },
    Delivery: {
        type:String,
        required:true
    },
    Categoryid: {
        type: String,
        required:true
    }
})

const Restaurant = mongoose.model('Restaurant', RestaurantSchema)
module.exports = Restaurant