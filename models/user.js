const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    FirstName: {
        type:String,
        min:3,
        required:true
    },
    LastName: {
        type:String,
        min:3,
        required:true
    },
    Email: {
        type:String,
        min:3,
        required:true
    },
    PhoneNo: {
        type:Number,
        min:10,
        required:true
    },
    Password: {
        type:String,
        min:8,
        required:true
    },
    admin: {
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User