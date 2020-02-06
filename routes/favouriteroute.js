const express = require('express');
const Favourite = require('../models/favourite');
const router = express.Router();

router.get('/', async(req,res)=>{
    try{
        const data = await Favourite.find({})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
});

router.post('/', async (req,res)=>{
    const post = new Favourite({
        userid:req.body.userid,
        restaurantid:req.body.restaurantid
    })
    try{
        const data = await post.save()
        res.json({data:data,result:true})
    }
    catch(err){
        res.json({message:err})
    }
})

module.exports = router;