const mongoose = require('mongoose');
const FavouriteSchema = new mongoose.Schema({
    userid:{
        type:String
    },
    restaurantid:{
        type:String
    }
})

module.exports = mongoose.model('Favourite', FavouriteSchema)