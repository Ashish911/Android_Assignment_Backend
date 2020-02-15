const express = require('express');
const Order = require('../models/order');
const router = express.Router();
const auth = require('../auth');

router.post('/', auth.verifyUser, async (req,res)=>{
    const post = new Order({
        userid:req.user._id,
        foodname:req.body.foodname,
        Price:req.body.Price,
        location:req.body.location,
        PhoneNo:req.body.PhoneNo
    })
    post.save().then((order)=>{
        res.send(order)
    })
});

router.get('/', auth.verifyUser, async (req,res)=>{
    Order.find({userid:req.user._id}).then((order)=>{
        res.send(order);
    }).catch((e)=>{
        res.send(e);
    })
});

module.exports = router;