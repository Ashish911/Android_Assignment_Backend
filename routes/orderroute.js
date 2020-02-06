const express = require('express');
const Order = require('../models/order');
const router = express.Router();

router.post('/', async (req,res)=>{
    const post = new Favorite({
        Userid:req.user._id,
        Foodid:req.food._id,
        Total:req.body.total
    })
    try{
        const data = await post.save()
        res.json({data:data,result:true})
    }
    catch(err){
        res.json({message:err})
    }
});

router.get('/', async (req,res)=>{
    try{
        const data = await Order.find({})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
});

module.exports = router;