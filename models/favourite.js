const mongoose = require('mongoose');
const FavouriteSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    foodid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
    }
})

module.exports = mongoose.model('Favourite', FavouriteSchema)