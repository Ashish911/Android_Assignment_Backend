const express = require('express')
const mongoose = require('mongoose')
const Food = require('../models/food')
const Restaurant = require('../models/restaurant');
const router = express.Router()

//get all the foods 
router.get('/', async(req, res) => {
    try{
        const data = await Food.find({})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
})

//post foods
router.post('/',(req,res)=>{
    let newFood = new Food({
        FoodName:req.body.FoodName,
        BookImage:req.body.BookImage,
        Category:req.body.Category,
        Price:req.body.Price
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

//get single food and update
router.put('/:id', ((req,res,next)=>{
    Food.findOneAndUpdate({_id: req.params.id }, {$set: req.body}, {new: true})
        .then((reply) => {
            if (reply == null) throw new Error("Food not found");
            res.json(reply);
        }).catch(next);
}));

//get single food and delete
router.delete('/deletefood/:id', function(req,res){
    Food.findByIdAndDelete(req.params.id).then(function(){
        res.send("deleted")
    }).catch(function(){
        res.send(e)
    })
})

// router.get('/', (req,res,next)=>{
//     Food.find()
//     .select('restaurant Name Price')
//     .then(docs=>{
//         res.status(200)
//         res.send(docs)
//     })
//     .catch(err=>{
//         res.status(500)
//         res.send(err)
//     })
// })

// router.post('/', (req,res,next)=>{
//     Restaurant.findById(req.body.restaurantId)
//         .then(restaurant =>{
//             if (!restaurant) {
//                 return res.send('Product Not Found');
//             }
//             const food = new Food({
//                 _id: mongoose.Types.ObjectId(),
//                 Name: req.body.Name,
//                 Price: req.body.Price,
//                 restaurant: req.body.restaurantId
//             });
//             return food.save()
//         })
//         .then(result=>{
//             console.log(result);
//             res.status(201)
//             res.send(result);
//         })
//         .catch(err=>{
//             console.log(err)
//             err.status(500)
//             err.send(err)
//             })
//     })

module.exports = router;