const express = require('express');
const Restaurant = require('../models/restaurant');
const Category = require('../models/categories');
const multer=require('multer')
const path=require("path");
const router = express.Router();

//get all resturants
router.get('/', async(req, res) => {
    try{
        const data = await Restaurant.find({})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
})

//get resturant of certain id
router.get('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Restaurant.findById(req.params.id).exec().then(doc=>{
            res.send(doc.toJSON());
        }).catch((e)=>{
            res.send(e);
        })
})

//path to store image
const storage = multer.diskStorage({
    destination: "./upload/Restaurantlist",
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

//post products or items
router.post('/',upload.single('Logo'),(req,res)=>{

        let newRestaurant = new Restaurant({
            Name: req.body.Name,
            Logo: req.file.filename,
            Tags: req.body.Tags,
            Location: req.body.Location,
            Delivery: req.body.Delivery,
            Categoryid: req.body.Categoryid
        });
        newRestaurant.save().then((CategoryDoc)=>{
            res.send(CategoryDoc);
        });
});

router.get('/search/:restaurantname', async (req, res) => {
    const searchTitle = req.params.restaurantname;
    console.log(searchTitle);
    const apartmentpost = Apartmentpost.find({ $text: {$search: searchTitle } })
        .then(apartmentpost => res.send(apartmentpost))
        .catch(err => res.status(404).send(err))
    if(!apartmentpost){
        res.status(200).send("No title found! Enter correct title")
    }
});

router.get('/getByCategory/:id', async(req,res)=>{
    try{
        console.log("here")
        const id = req.params.id
        const data = await Restaurant.find({Categoryid:id})
        res.json({data:data,message:true})
    }
    catch(err){
        res.json({message:false, error:err})
    }
})

//get single restaurant or items by id
router.patch('/:restaurantid',upload.single('Logo'),(req, res) => {
    // We want to upload a image in a restaurant specified by restaurantId
    Restaurant.findOne({
        _id: req.params.restaurantid
    }).then((restaurant) => {
        if (restaurant) {
            // restaurant object with the specified conditions was found
            return true;
        }
        // else - the restaurant object is undefined
        return false;
    }).then((canUploadImage) => {
        if (canUploadImage) {
            Restaurant.findOneAndUpdate({
                    _id: req.params.restaurantid
                }, {
                    $set: req.body
                }
            ).then(() => {
                res.send({ message: 'Restaurant updated successfully' })
            })
        } else {
            res.sendStatus(404);
        }
    })
});

router.delete('/:restaurantid', (req,res,next)=>{
    const id = req.params.restaurantid;
    Restaurant.remove({_id:id}).exec().then(result=>{
        res.status(200).json(res);
    }).catch(err =>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;