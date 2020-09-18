const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretkey= 'secret';
const User = require('../../models/User');
const validateLoginInput = require('../../validation/login');
router.get('/test', async (req,res) => {
    User.find()
    .then(user => {
        return res.send(user)
    })
}
);
//check if suer exists and if not register user
router.post('/register', async (req, res) => {
    // find user by username
    User.findOne({username:req.body.username})
    .then(user => {
        if (user){
            return res.status(404).json({msg: 'user already exists'});
        } else{
            const newUser= new User ({
                username:req.body.username,
                password:req.body.password
            });
            bcrypt.genSalt(10,(err,salt) => {
                bcrypt.hash(newUser.password,salt,(err,hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser.save()
                        .then(user=> res.json(user))
                        .catch(err => res.json(err));
                })
            })
        }
    })
});
//login user and return jWT token
router.post('/login', async (req, res) => {
    const { errors , isValid } = validateLoginInput(req.body);
    if (!isValid)
    {
        return res.status(400).json(errors);
    }
    const username = req.body.username;
    const password = req.body.password;
// find user by username
    User.findOne({username})
    //check for user
    .then(user => {
        if (!user){ //if no user
            errors.username = "user with this username not found";
            return res.status(404).json(errors);
        }
        //user with username exists
        //now check password entered by user (text)
        bcrypt.compare(password,user.password)
        .then(isMatch => {
            if(isMatch){ //password and user match
                //res.json('login success')
                //sign token
                console.log ("user logged in success")
                const payload= {id:user.id , username:user.username} //create jwt payload
                jwt.sign(payload,secretkey , 
                    {expiresIn: 3600} , 
                    (err,token) => {
                        res.json({
                            success : true,
                            token:'Bearer ' + token
                        });
                    });
            } else {
                errors.password = "incorrect password";
                return res.status(404).json(errors);
            }
        })
    });
});
router.get('/current' , 
passport.authenticate('jwt', {session:false}), 
(req,res) => {
res.json({
    id:req.user.id,
    username:req.user.username
}
);
});
module.exports = router;