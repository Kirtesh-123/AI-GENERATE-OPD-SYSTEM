const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// BOOK APPOINTMENT
router.post("/book", async (req,res)=>{

  const count = await Appointment.countDocuments();

  const appt = new Appointment({
    patientName:req.body.patientName,
    bloodGroup:req.body.bloodGroup,
    date:req.body.date,
    tokenNumber:1000 + count + 1
  });

  await appt.save();

  res.json(appt);
});

// GET LIVE QUEUE
router.get("/queue", async (req,res)=>{
  const data = await Appointment.find();
  res.json(data);
});

module.exports = router;