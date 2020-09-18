const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =  new mongoose.Schema({
        username: {
            type: String,
          },
          password:{
            type: String,
          },
        });

module.exports= user = mongoose.model('Logindetail', UserSchema);