const express = require('express');
const Category = require('../models/categories');
const router = express.Router();

//post categorys
router.post('/',(req,res)=>{
    let newCategory = new Category({
        CategoryName:req.body.CategoryName,
        CategoryImage:req.body.filename
    });
    newCategory.save().then((CategoryDoc)=>{
        res.send(CategoryDoc);
    });
});


router.get('/', async(req, res) => {
    Category.find({})
    .then((categorylist)=>{
        res.send(categorylist);
    }).catch((err)=>{
        res.send('Error', err.message)
    })
})


module.exports = router;