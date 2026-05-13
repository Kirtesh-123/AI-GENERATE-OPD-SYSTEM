const express = require("express");
const cors = require("cors");
const Appointment =
require("./models/Appointment");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* DATABASE TEMP ARRAY */
let data = [];

/* BOOK APPOINTMENT */
app.post("/book", (req, res) => {

  const token = 100 + data.length + 1;

  const patient = {

    id: Date.now(),

    token: token,

    name: req.body.name,

    blood: req.body.blood,

    gender: req.body.gender,

    department: req.body.department,

    priority: req.body.priority,

    disease: req.body.disease,

    doctor: req.body.doctor

  };

  /* EMERGENCY FIRST */
  if (patient.priority === "Emergency") {

    data.unshift(patient);

  } else {

    data.push(patient);

  }

  res.json(patient);

});

/* GET APPOINTMENTS */
/* =========================
   GET ALL APPOINTMENTS
========================= */

app.get("/appointments", async(req,res)=>{

  try{

    const data =
    await Appointment.find();

    res.json(data);

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:"Server Error"

    });

  }

});

/* DELETE APPOINTMENT */
app.delete("/delete/:id", (req, res) => {

  data = data.filter(
    patient =>
    patient.id != req.params.id
  );

  res.json({
    message: "Appointment Deleted"
  });

});

/* START SERVER */
app.listen(5000, () => {

  console.log(
    "✅ Server Running On Port 5000"
  );

});