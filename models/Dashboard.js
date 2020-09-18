const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserDashboard =  new mongoose.Schema({
    user: {
      type:mongoose.Schema.Types.ObjectId,
      ref:'Logindetail'
      },
      date:{
        type: Date,
        default: Date.now,
      },
      description: {
      type : String , 
      },
      amount:{
        type: String,
      },
        });

module.exports= dashborad = mongoose.model('dashborads', UserDashboard);