const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const jwtSecret = "1234qwerasdfzxcv";
const router = express.Router()

//get all users in admin panel.
router.get('/userlist', (req,res)=>{
    User.find({})
    .then((userlists)=>{
        res.send(userlists);
    }).catch((err)=>{
        res.send('Error', err.message)
    })
});

//For User SignUp
router.post('/signup', (req,res, next) => {
    User.find({Email: req.body.Email}) //Check if email id exists
    .exec()
    .then(user => {
        if (user.length >=1) {
            return res.status(409).json({
                message: 'Email ID already exists'
            });
        }
        else{
            let Password = req.body.Password
            bcrypt.hash(Password, 10, function(err,hash){
            if(err){
                let err = new Error('Could not hash!')
            err.status = 500
            return next(err)
            }
            User.create({
                FirstName: req.body.FirstName,
                LastName: req.body.LastName,
                Email: req.body.Email,
                PhoneNo: req.body.PhoneNo,
                Password: hash
            }).then(()=>{
                res.json({ status: "Signup success!"});
            }).catch(next);
        })
        }      
    })
})

//For Login
router.post('/login', (req, res, next)=>{
    User.findOne({ Email: req.body.Email})
        .then((user)=>{
            if (user == null){
                let err = new Error('User not found!!');
                err.status = 401;
                return next(err);
            } else {
                bcrypt.compare(req.body.Password, user.Password)
                    .then((isMatch) =>{
                        if(!isMatch){
                            let err = new Error('Password does not match');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, jwtSecret);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

module.exports = router;