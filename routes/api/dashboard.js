const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secretkey= 'secret';
const User = require('../../models/User');
const Dashboard = require('../../models/Dashboard');

router.get('/test', async (req,res) => {
    res.json({msg: 'Dashbaord page works'})
}
);

router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
Dashboard.find({user:req.user.id})
.then(dashboard => {
    if(!dashboard) {
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
    }
    res.json(dashboard);
})
    .catch(err => res.status(404).json(err));
});

router.get('/user/:user_id', passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    let result = {};
    let balance = 0;
Dashboard.find({user:req.params.user_id})
.populate('user',['name'])
.then(dashboard => {
    if(!dashboard) {
        console.log(req.params.user_id)
        errors.noprofile = 'There is no profile for this user';
        return res.status(404).json(errors);
    }
    console.log("searching user");
    console.log(dashboard);
    result['trans'] = dashboard;
    for (key in dashboard)
    {
        balance = balance + (+(result['trans'][key].amount)) ;
    }
    console.log("Total balance is ", balance);
    result['bal'] = balance;
    console.log(result);
    res.json(result);
})
    .catch(err => res.status(404).json('There is no profile for this user'));
});

//create user profile
router.post('/', passport.authenticate('jwt', {session:false}), async (req, res) => {
    // find user by username
            console.log("I am trying to create new record for dashboard");
            const newRecord= new Dashboard ({
                user:req.user.id,
                description:req.body.description,
                amount:req.body.amount
            });
            newRecord.save()
                    .then(newRecord=> res.json(newRecord))
                    .catch(err => res.json(err));
    });
/*router.get("/me", passport.authenticate('jwt', {session:false}), async (req, res) => {
    try {
      const profile = await Dashboard.findOne({
        user: req.user.id
      }).populate("user", ["name"]);
      if (!profile) {
        return res.status(400).json({ msg: "There is no profile fot this user" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });*/
  module.exports = router;