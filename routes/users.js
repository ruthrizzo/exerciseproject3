const router = require('express').Router();
const User =  require('../models/user.model');
const mongoose = require('mongoose');
const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require ('../middleware/isLoggedOut');
// const cors = require ('cors'); 

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded());

// router.route('/').get((req, res) => {
//     User.find ()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error:' + err));
// });

// router.route('/add').post((req,res) => {
//     const username = req.body.username;

//     const newUser = new User ({username});

//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.json('Error: ' + err));
// });

// module.exports = router; 
 
//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  })
  
//   const User = new mongoose.model("User", userSchema)
  
  //routes routes
  
  router.post("/login",(req,res)=>{
      console.log(req.body)
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        console.log(user)
        if(user){
           if(password === user.password){
               res.send({message:"login success",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
  });
  router.post("/register",(req,res)=>{
    console.log(req.body) 
    const {username,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({username,email,password})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })
  });

  module.exports = router;
  