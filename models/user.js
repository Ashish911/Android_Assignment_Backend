const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    FullName: {
        type:String,
        min:3,
        required:true
    },
    UserName: {
        type:String,
        min:3,
        required:true
    },
    Email: {
        type:String,
        min:3,
        required:true,
        unique:true
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
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User