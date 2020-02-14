const express = require('express')
const mongoose = require('mongoose')
const Food = require('../models/food')
const multer = require('multer')
const path = require('path')
const Restaurant = require('../models/restaurant');
const router = express.Router()

//path to store image
const storage = multer.diskStorage({
    destination: "./upload/Images",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

//check file types
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});


//get all the foods 
router.get('/', (req, res) => {
    Food.find({})
        .then((foodlist)=>{
            res.send(foodlist);
        }).catch((err)=>{
        res.send('Error', err.message)
    })
})

//post foods
router.post('/', upload.single('FoodImage'),(req,res)=>{
    let newFood = new Food({
        FoodName:req.body.FoodName,
        FoodImage:req.file.filename,
        Price:req.body.Price,
        Restaurantid:req.body.Restaurantid
    });
    newFood.save().then((foodDoc)=>{
        res.send(foodDoc);
    });
});

router.get('/:id', (req,res,next)=>{
    Food.findById(req.params.id).exec().then(doc=>{
        console.log(doc);
        res.status(200).json({doc})        
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})


router.get('/getByRestaurant/:id', async(req,res)=>{
    try{
        console.log("here")
        const id = req.params.id
        const data = await Food.find({Restaurantid:id})
        res.json(data);
    }
    catch(err){
        res.status(404).send(err)
    }
})

router.get('/search/:foodName', async (req, res) => {
    const searchName = req.params.foodName;
    console.log(searchName);
    try {
        const search = await Food.find({$text:{$search:searchName}})
        res.send(search);
    } catch (error) {
        res.status(400).send(error)
    }
});

//get single food and update
router.put('/:id', ((req,res,next)=>{
    Food.findOneAndUpdate({_id: req.params.id }, {$set: req.body}, {new: true})
        .then((reply) => {
            if (reply == null) throw new Error("Food not found");
            res.json(reply);
        }).catch(next);
}));

router.delete('/', (req, res)=>{
    Food.deleteMany({})
        .then((foodlist)=>{
            res.send(foodlist);
        }).catch((err)=>{
        res.send('Error', err.message)
    })
})

//get single food and delete
router.delete('/:id', function(req,res){
    Food.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){
        res.send(e)
    })
})

module.exports = router;