const express = require('express');
const Favourite = require('../models/favourite');
const router = express.Router();

router.get('/', (req,res)=>{
    Favourite.find({})
        .then((favouritelist)=>{
            res.send(favouritelist);
        }).catch((err)=>{
        res.send('Error', err.message)
    })
});

router.post('/',  (req,res)=>{
    let newFavourite = new Favourite({
        userid:req.body.userid,
        restaurantid:req.body.restaurantid
    });
    newFavourite.save().then((FavouriteDoc)=>{
        res.send(FavouriteDoc);
    });
})

router.delete('/', (req, res)=>{
    Favourite.deleteMany({})
        .then((favouritelist)=>{
            res.send(favouritelist);
        }).catch((err)=>{
        res.send('Error', err.message)
    })
})

module.exports = router;