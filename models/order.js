const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    Foodid: {
        type:String
    },
    Userid: {
        type:String
    },
    Total: {
        type:String
    }
})

module.exports = mongoose.model('Order', OrderSchema)