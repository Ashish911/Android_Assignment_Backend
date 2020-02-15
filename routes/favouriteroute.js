const express = require('express');
const Favourite = require('../models/favourite');
const router = express.Router();
const auth = require('../auth');
const Food = require('../models/food');

router.post('/', auth.verifyUser, async(req,res)=>{
    const newFavourite = new Favourite({
        userid:req.user._id,
        foodid:req.body.foodid
    });
    newFavourite.save().then((FavouriteDoc)=>{
        res.send(FavouriteDoc);
    });
});

router.get('/', auth.verifyUser , async (req,res)=>{
    Favourite.find({userid: req.user._id})
        .populate('foodid')
        .exec()
        .then((favouritelist)=>{
            res.json(favouritelist);
        }).catch((e)=>{
        res.send(e)
    })
});

router.delete('/', (req, res)=>{
    Favourite.deleteMany({})
        .then((favouritelist)=>{
            res.send(favouritelist);
        }).catch((err)=>{
        res.send('Error', err.message)
    })
})

router.get('/all', auth.verifyUser, async (req, res) => {
    Favourite.findOne({
        userid: req.user._id
    }).then((product) => {
        if (product) {
            return true;
        }
        return false;
    }).
    then((canUploadImage) => {
        if (canUploadImage) {
            Food.find({}).then((foodlist)=>{
                res.send(foodlist);
            }).catch((e)=>{
                res.send(e);
            })
        } else {
            res.sendStatus(404);
        }
    })
});

module.exports = router;