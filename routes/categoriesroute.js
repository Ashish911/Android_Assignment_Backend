const express = require('express');
const Category = require('../models/categories');
const multer = require('multer');
const path = require('path');
const router = express.Router();

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


//post category
router.post('/', upload.single('CategoryImage'),(req,res)=>{
    let newCategory = new Category({
        CategoryName:req.body.CategoryName,
        CategoryImage:req.file.filename
    });
    newCategory.save().then((CategoryDoc)=>{
        res.send(CategoryDoc);
    });
});


router.get('/', (req, res) => {
    Category.find({})
    .then((categorylist)=>{
        res.send(categorylist);
    }).catch((err)=>{
        res.send('Error', err.message)
    })
})

router.get('/:id', (req,res)=>{
    Category.findById(req.params.id).exec().then(doc=>{
        console.log(doc)
        res.status(200).json({doc})
    })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error:err})
        })
})

router.delete('/', (req, res)=>{
    Category.deleteMany({})
        .then((categorylist)=>{
            res.send(categorylist);
        }).catch((err)=>{
            res.send('Error', err.message)
    })
})

router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    Category.remove({_id:id}).exec().then(result=>{
        res.status(200).json(res);
    }).catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
})


module.exports = router;