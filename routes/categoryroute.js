const express = require('express')
const Category = require('../models/category')
const multer = require('multer');
const path = require("path");
const router = express.Router();

router.get('/categorylist', (req,res)=>{
    Category.find({})
    .then((categorylists)=>{
        res.send(categorylists);
    }).catch((err)=>{
        res.send('Error', err.message);
    })
})

const storage = multer.diskStorage({
    destination: "./upload/catogorylist",
    filename: (req, file, callback) =>{
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
})

const imageFileFilter = (req, file, cb)=>{
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null,true);
}

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});

router.post('/CategoryAdd', upload.single('Image'),(req,res)=>{
    let newCategory = new Category({
        CategoryName: req.body.CategoryName,
        CategoryImage: req.file.filename
    });
    newCategory.save().then((categoryDoc)=>{
        res.send(categoryDoc);
    });
});

module.exports = router;