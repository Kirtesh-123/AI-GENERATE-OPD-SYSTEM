const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({

  name:{
    type:String,
    required:true
  },

  blood:{
    type:String,
    required:true
  },

  gender:String,

  department:String,

  priority:String,

  disease:String,

  doctor:String,

  token:Number,

  status:{
    type:String,
    default:"Active"
  },

  createdAt:{
    type:Date,
    default:Date.now
  }

});

module.exports =
mongoose.model(
  "Appointment",
  appointmentSchema
);