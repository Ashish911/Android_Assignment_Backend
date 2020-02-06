const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const jwtSecret = "1234qwerasdfzxcv";
const router = express.Router()

//get all users in admin panel.
// router.get('/userlist', (req,res)=>{
//     User.find({})
//     .then((userlists)=>{
//         res.send(userlists);
//     }).catch((err)=>{
//         res.send('Error', err.message)
//     })
// });

router.get('/userlist',(async(req,res)=>{
    const data = await User.find({})
    res.send(data)
}))

router.post('/signup', (async(req,res)=>{
        const post = new User({
            FullName: req.body.FullName,
            UserName: req.body.UserName,
            Email: req.body.Email,
            PhoneNo: req.body.PhoneNo,
            Password: req.body.Password
        })
        try{
            const data = await post.save();
            if(data!=null){
                res.send({
                    status:true,
                    message:'Register Successful'
                })
            }
            else{
                res.send({
                    status:false,
                    message:'Register UnSuccessful'
                })
            }
        }
        catch(err){
            res.send({
                status:false,
                message:'Something is wrong'
            })
        }
    })
)

router.post('/login',( async (req,res)=>{
        const UserName = req.body.UserName
        const Password = req.body.Password
        // console.log(req.body)
        const data = await User.findOne({UserName:UserName})
        // console.log(data)
        if(data!=null){
            if(data.Password===Password){
                res.send({
                    status:true,
                    message:'Login Successful'
                })
            }
            else{
                res.send({
                    status:false,
                    message:'Password Wrong'
                })
            }
        }
        else{
            res.send({
                status:false,
                message:'User Not Found'
            })
        }
    })
)

//For User SignUp
// router.post('/signup', (req,res, next) => {
//     User.find({UserName: req.body.UserName}) //Check if email id exists
//     .exec()
//     .then(user => {
//         if (user.length >=1) {
//             return res.status(409).json({
//                 message: 'UserName already exists'
//             });
//         }
//         else{
//             let Password = req.body.Password
//             bcrypt.hash(Password, 10, function(err,hash){
//             if(err){
//                 let err = new Error('Could not hash!')
//             err.status = 500
//             return next(err)
//             }
//             User.create({
//                 FullName: req.body.FullName,
//                 UserName: req.body.UserName,
//                 Email: req.body.Email,
//                 PhoneNo: req.body.PhoneNo,
//                 Password: hash
//             }).then(()=>{
//                 res.json({ status: "Signup success!"});
//             }).catch(next);
//         })
//         }      
//     })
// })

// //For Login
// router.post('/login', (req, res, next)=>{
//     User.findOne({ UserName: req.body.UserName})
//         .then((user)=>{
//             if (user == null){
//                 let err = new Error('User not found!!');
//                 err.status = 401;
//                 return next(err);
//             } else {
//                 bcrypt.compare(req.body.Password, user.Password)
//                     .then((isMatch) =>{
//                         if(!isMatch){
//                             let err = new Error('Password does not match');
//                             err.status = 401;
//                             return next(err);
//                         }
//                         let token = jwt.sign({ _id: user._id }, jwtSecret);
//                         res.json({ status: 'Login success!', token: token });
//                     }).catch(next);
//             }
//         }).catch(next);
// })

module.exports = router;