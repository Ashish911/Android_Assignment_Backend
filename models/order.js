const mongoose = require('mongoose')
const OrderSchema = new mongoose.Schema({
    Foodid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Food'
    },
    Userid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Order', OrderSchema)