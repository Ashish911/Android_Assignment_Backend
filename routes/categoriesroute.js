const express = require('express');
const Category = require('../models/categories');
const multer = require('multer');
const router = express.Router();

//post categorys
router.post('/',(req,res)=>{
    let newCategory = new Category({
        CategoryName:req.body.CategoryName,
        CategoryImage:req.body.CategoryImage
    });
    newCategory.save().then((CategoryDoc)=>{
        res.send(CategoryDoc);
    });
});