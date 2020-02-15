const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    userid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    foodname: {
        type:String
    },
    Price: {
        type:String
    },
    location: {
        type:String
    },
    PhoneNo:{
        type:String
    }
})

module.exports = mongoose.model('Order', OrderSchema)