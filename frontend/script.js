/* =========================
   PAGE SYSTEM
========================= */

function show(id) {
  if (id === 'admin') {
    updateAdmin();
  }
  document.querySelectorAll('.page').forEach((p) => {
    p.style.display = 'none';
  });

  document.getElementById(id).style.display = 'block';

  if (id === 'doctor') loadDoctorDashboard();
  if (id === 'appointments') loadAppointments();
}

function closePage() {
  document.querySelectorAll('.page').forEach((p) => {
    p.style.display = 'none';
  });

  document.getElementById('home').style.display = 'block';
}

window.onload = function () {
  closePage();
  updateClock();
  show('home');
};
/* =========================
   CLOCK
========================= */

function updateClock() {
  const now = new Date();
  const clock = document.getElementById('clock');

  if (clock) {
    clock.innerHTML = now.toLocaleTimeString();
  }
}

setInterval(updateClock, 1000);

/* =========================
   DROPDOWN PROBLEM LIST
========================= */

const problems = [
  'Heart Pain',
  'Chest Pain',
  'Bone Fracture',
  'Eye Problem',
  'Skin Allergy',
  'Child Fever',
  'Breathing Problem',
  'Headache',
  'Tooth Pain',
  'Ear Infection',
];

// function showProblems() {
//   let box = document.getElementById('problemList');
//   box.innerHTML = '';

//   problems.forEach((p) => {
//     let div = document.createElement('div');
//     div.innerText = p;

//     div.onclick = () => {
//       document.getElementById('problem').value = p;
//       box.classList.add('hidden');
//     };

//     box.appendChild(div);
//   });

//   box.classList.remove('hidden');
// }

// click outside close dropdown
document.addEventListener('click', function (e) {
  if (!e.target.closest('.ai-box')) {
    document.getElementById('problemList')?.classList.add('hidden');
  }
});

/* =========================
   AI DOCTOR SYSTEM (FINAL)
========================= */

function suggestDoctor() {
  let p = document.getElementById('problem').value.toLowerCase();

  let result = '';
  let doctorHTML = '';

  if (p.includes('heart') || p.includes('chest')) {
    result = '❤️ Cardiologist Needed';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Rajesh Patil (Cardiologist)
      </div>
      <div class="match-card">
        👨‍⚕ Dr. Khan (Cardiologist)
      </div>
    `;
  } else if (p.includes('bone')) {
    result = '🦴 Orthopedic Needed';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Amit Deshmukh
      </div>
      <div class="match-card">
        👨‍⚕ Dr. Joshi
      </div>
    `;
  } else if (p.includes('eye')) {
    result = '👁 Eye Specialist Needed';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Pooja Verma
      </div>
    `;
  } else if (p.includes('skin')) {
    result = '✨ Dermatologist Needed';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Anjali Patne
      </div>
    `;
  } else if (p.includes('child') || p.includes('fever')) {
    result = '👶 Pediatrician Needed';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Sneha Kulkarni
      </div>
    `;
  } else if (p.includes('breathing')) {
    result = '🫁 Pulmonologist Needed';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Vikram Joshi
      </div>
    `;
  } else {
    result = '👨‍⚕ General Physician Recommended';

    doctorHTML = `
      <div class="match-card">
        👨‍⚕ Dr. Sharma
      </div>
    `;
  }

  document.getElementById('aiResult').innerHTML = result;
  document.getElementById('doctorMatch').innerHTML = doctorHTML;
}

/* =========================
   BOOK APPOINTMENT (CLEAN)
========================= */

async function bookAppointment() {
  const name = document.getElementById('patientName').value;
  const blood = document.getElementById('bloodGroup').value;
  const gender = document.getElementById('gender').value;
  const department = document.getElementById('department').value;
  const priority = document.getElementById('priority').value;
  const disease = document.getElementById('disease').value;
  const doctor = document.getElementById('doctor').value;

  /* =========================
   EMERGENCY MODE
========================= */

if(priority === "Emergency"){

  // SHOW OVERLAY
  document
  .getElementById(
    "emergencyOverlay"
  )
  .style.display = "flex";

  // RANDOM TOKEN
  const token =
  "E-" +
  Math.floor(
    100 + Math.random()*900
  );

  document
  .getElementById(
    "emergencyToken"
  )
  .innerHTML = token;

  // VOICE ALERT
  const speech =
  new SpeechSynthesisUtterance(

    "Emergency patient detected. Critical priority activated"

  );

  speech.lang = "en-US";

  speechSynthesis.speak(speech);

  // AUTO CLOSE
  setTimeout(()=>{

    document
    .getElementById(
      "emergencyOverlay"
    )
    .style.display = "none";

  },5000);

}
  if (!name || !blood) {
    alert('Fill required details');
    return;
  }

  await fetch('http://localhost:5000/book', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      blood,
      gender,
      department,
      priority,
      disease,
      doctor,
    }),
  });

  alert('Appointment Booked Successfully ✅');

  loadAppointments();
}
/* =========================
   CREATE LIVE PATIENT
========================= */

const patient = {

  name : name,

  token :
  Math.floor(
    100 + Math.random()*900
  ),

  disease : disease,

  doctor : doctor,

  room :

  disease === "Heart Attack" ||
  disease === "Bone Fracture" ||
  disease === "Accident Injury"

  ?

  "🏥 Operation Theatre"

  :

  "💊 OPD Room 02",

  operation :

  disease === "Heart Attack" ||
  disease === "Bone Fracture" ||
  disease === "Accident Injury"

  ?

  "2 Hours"

  :

  "15 Minutes"

};


/* =========================
   ADD TO QUEUE
========================= */

patientQueue.push(patient);


/* =========================
   UPDATE LIVE SCREEN
========================= */

updateLiveScreen();


/* =========================
   AI VOICE ANNOUNCEMENT
========================= */

hospitalAnnouncement();
/* =========================
   AUTO EMERGENCY DETECT
========================= */

if(priority === "Emergency"){

  document.getElementById(
    "emergencyPatientBox"
  ).innerHTML = `

    <div class="appointment-card">

      <h2>
        🚨 Emergency Patient Detected
      </h2>

      <br>

      <h3>
        👤 ${name}
      </h3>

      <p>
        🦠 Disease :
        ${disease}
      </p>

      <p>
        👨‍⚕ Doctor :
        ${doctor}
      </p>

      <p>
        🏥 Department :
        ${department}
      </p>

      <br>

      <div class="live-alert">

        🚑 Ambulance Sent Automatically

      </div>

    </div>

  `;

  /* VOICE */

  const speech =
  new SpeechSynthesisUtterance(

    "Emergency patient detected. Ambulance dispatched."

  );

  speech.lang = "en-US";

  speechSynthesis.speak(speech);

  /* AUTO OPEN */

  show("emergencyPanel");

}

/* =========================
   LOAD APPOINTMENTS
========================= */

async function loadAppointments() {
  const res = await fetch('http://localhost:5000/appointments');
  const data = await res.json();

  let html = '';
  let emergencyCount = 0;

  data.forEach((p) => {
    if (p.priority === 'Emergency') emergencyCount++;

    html += `
      <div class="appointment-card">
        <h3>👤 ${p.name}</h3>
        <p>🎟 Token: <b>${p.token}</b></p>
        <p>🩸 ${p.blood}</p>
        <p>🚻 ${p.gender}</p>
        <p>🏥 ${p.department}</p>
        <p>👨‍⚕ ${p.doctor}</p>
        <p>🦠 ${p.disease}</p>
        <span class="${p.priority === 'Emergency' ? 'emergency-badge' : 'normal'}">
          ${p.priority}
        </span>
      </div>
    `;
  });

  document.getElementById('list').innerHTML = html;

  document.getElementById('totalCount').innerText = data.length;
  document.getElementById('emergencyCount').innerText = emergencyCount;
}

/* =========================
   DOCTOR DASHBOARD
========================= */

async function loadDoctorDashboard() {
  const res = await fetch('http://localhost:5000/appointments');
  const data = await res.json();

  let html = '';

  data.forEach((p) => {
    html += `
      <div class="doctor-card">
        <h3>👤 ${p.name}</h3>
        <p>🎟 ${p.token}</p>

        <button onclick="completePatient('${p._id}')">Complete</button>
        <button onclick="makeEmergency('${p._id}')">Emergency</button>
      </div>
    `;
  });

  document.getElementById('doctorList').innerHTML = html;
}

/* =========================
   ACTIONS
========================= */

async function completePatient(id) {
  await fetch(`http://localhost:5000/delete/${id}`, { method: 'DELETE' });
  loadAppointments();
  loadDoctorDashboard();
}

async function makeEmergency(id) {
  await fetch(`http://localhost:5000/emergency/${id}`, { method: 'PUT' });
  loadAppointments();
  loadDoctorDashboard();
}

/* =========================
   QR CODE
========================= */

function generateQR(text) {
  document.getElementById('qrBox').innerHTML = '';

  new QRCode(document.getElementById('qrBox'), {
    text: text,
    width: 180,
    height: 180,
    colorDark: '#00ffff',
    colorLight: '#06121f',
  });
}

/* =========================
   VOICE TOKEN SYSTEM
========================= */



function announceToken() {
  const speech = new SpeechSynthesisUtterance(
    'Token ' + currentToken + ' please go to OPD room',
  );

  speech.lang = 'en-US';
  speechSynthesis.speak(speech);
}

/* =========================
   SEARCH DOCTOR
========================= */

function searchDoctor() {
  let input = document.getElementById('searchDoctor').value.toLowerCase();
  let cards = document.querySelectorAll('.doctor-card');

  cards.forEach((card) => {
    card.style.display = card.innerText.toLowerCase().includes(input)
      ? 'block'
      : 'none';
  });
}

/* =========================
   SMART ADMIN DASHBOARD
========================= */

async function updateAdmin(){

  try{

    const res =
    await fetch(
      "http://localhost:5000/appointments"
    );

    const data =
    await res.json();

    let totalPatients = data.length;

    let emergencyPatients = 0;

    let activePatients = 0;

    data.forEach(patient=>{

      // EMERGENCY COUNT
      if(
        patient.priority &&
        patient.priority.toLowerCase()
        === "emergency"
      ){

        emergencyPatients++;

      }

      // ACTIVE
      if(
        patient.status === "Active"
      ){

        activePatients++;

      }

    });

    // TOTAL
    document.getElementById(
      "adminPatients"
    ).innerHTML =
    totalPatients;

    // EMERGENCY
    document.getElementById(
      "adminEmergency"
    ).innerHTML =
    emergencyPatients;

    // ACTIVE
    document.getElementById(
      "adminActive"
    ).innerHTML =
    activePatients;

  }

  catch(error){

    console.log(error);

  }

}

/* =========================
   AI FACE MOOD DETECTOR
========================= */




/* OPEN CAMERA WHEN PAGE LOAD */
window.addEventListener(

  "load",

  ()=>{

    startCamera();

  }

);




/* =========================
   FAMILY LIVE TRACKING
========================= */
/* =========================
   FAMILY LIVE TRACKING
========================= *//* =========================
   FAMILY LIVE TRACKING
========================= */

function trackPatient(){

  const name =
  document.getElementById(
    "trackName"
  ).value;

  const locations = [

    {
      dept:"🩻 Radiology Department",
      room:"Room No. 204",
      floor:"2nd Floor",
      status:"Waiting For X-Ray",

      direction:`
      ➡️ Go Straight 20m
      <br><br>
      ⬅️ Turn Left
      <br><br>
      🛗 Use Lift To 2nd Floor
      <br><br>
      🚪 Room 204 On Right Side
      `
    },

    {
      dept:"❤️ Cardiology OPD",
      room:"Room No. 112",
      floor:"1st Floor",
      status:"Heart Checkup Running",

      direction:`
      ➡️ Walk Straight
      <br><br>
      🛗 Take Lift To 1st Floor
      <br><br>
      ➡️ OPD Section Right Side
      <br><br>
      🚪 Room 112
      `
    },

    {
      dept:"🧠 Neurology Department",
      room:"Room No. 305",
      floor:"3rd Floor",
      status:"Brain Scan In Progress",

      direction:`
      ➡️ Go Straight 30m
      <br><br>
      🛗 Use Lift
      <br><br>
      🏢 3rd Floor Left Wing
      <br><br>
      🚪 Room 305
      `
    },

    {
      dept:"💉 Emergency Ward",
      room:"Emergency Room 01",
      floor:"Ground Floor",
      status:"Critical Treatment Running",

      direction:`
      🚨 Emergency Entry
      <br><br>
      ➡️ Ground Floor
      <br><br>
      🚪 Emergency Room 01
      `
    }

  ];

  if(name === ""){

    alert("Enter Patient Name");
    return;
  }

  const randomLocation =
  locations[
    Math.floor(
      Math.random() *
      locations.length
    )
  ];

  document.getElementById(
    "trackingResult"
  ).innerHTML = `

    👤 Patient Name :
    <br>
    ${name}

    <br><br>

    📍 Current Department :
    <br>
    ${randomLocation.dept}

    <br><br>

    🚪 Room Number :
    <br>
    ${randomLocation.room}

    <br><br>

    🏢 Floor :
    <br>
    ${randomLocation.floor}

    <br><br>

    📢 Current Status :
    <br>
    ${randomLocation.status}

    <br><br>

    <div class="direction-box">

      🗺️ Hospital Navigation
      <br><br>

      ${randomLocation.direction}

    </div>

  `;

  // AI VOICE

  const speech =
  new SpeechSynthesisUtterance(

    name +
    " is currently in " +
    randomLocation.dept +
    ". " +
    randomLocation.room +
    ". " +
    randomLocation.floor

  );

  speech.lang = "en-US";

  speechSynthesis.speak(speech);
}

/* =========================
   AI HEALTH TIPS
========================= */

const healthTips = [

  "Drink More Water 💧",

  "Check Blood Pressure Regularly ❤️",

  "Sleep Minimum 8 Hours 😴",

  "Exercise Daily 🏃",

  "Wash Hands Frequently 🧼",

  "Avoid Junk Food 🍔",

  "Wear Mask In Crowded Areas 😷",

  "Take Medicines On Time 💊",

  "Mental Health Matters 🧠",

  "Emergency Help Available 24/7 🚑"

];

let tipIndex = 0;

function changeHealthTip(){

  const tip =
  document.getElementById("healthTip");

  if(tip){

    tip.innerHTML =
    healthTips[tipIndex];

    tipIndex++;

    if(tipIndex >= healthTips.length){

      tipIndex = 0;
    }
  }
}

setInterval(
  changeHealthTip,
  4000
);


/* =========================
   REAL AI CAMERA
========================= */
function showSkinResult(){

  const problems = [

    {
      name:"Pimples",

      img:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800",

      doctor:"Dr. Anjali Patne",

      solution:"Drink more water & avoid oily food"
    },

    {
      name:"Dark Spots",

      img:"https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800",

      doctor:"Dr. Neha Pawar",

      solution:"Use Vitamin C & proper sleep"
    },

    {
      name:"Dry Skin",

      img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800",

      doctor:"Dr. Sharma",

      solution:"Use moisturizer daily"
    }

  ];

  let html = "";

  problems.forEach(item=>{

    html += `

    <div class="skin-card">

      <img src="${item.img}">

      <h2>
        ${item.name}
      </h2>

      <p>
        👨‍⚕ Doctor :
        ${item.doctor}
      </p>

      <p>
        💡 ${item.solution}
      </p>

    </div>

    `;

  });

  document
  .getElementById(
    "scanResult"
  )
  .innerHTML = html;

}

/* =========================
   MOOD CAMERA
========================= */

async function startCamera(){

  try{

    const video =
    document.getElementById("video") ||
    document.getElementById("skinVideo") ||
    document.getElementById("moodVideo");

    if(!video){
      console.log("No video element found");
      return;
    }

    const stream =
    await navigator.mediaDevices.getUserMedia({
      video:true,
      audio:false
    });

    video.srcObject = stream;
    video.play();

  }

  catch(error){

    console.log(error);

    // ❌ REMOVE ALERT (you asked)
    // alert("Camera Error");

  }

}

/* =========================
   AI MOOD DETECT
========================= */

function detectMood(){

  const moods = [

    "😊 Normal",
    "😟 Stress",
    "😴 Tired",
    "🤒 Sick"

  ];

  const randomMood =
  moods[
    Math.floor(
      Math.random()*moods.length
    )
  ];

  document
  .getElementById(
    "moodResult"
  )
  .innerHTML =
  randomMood;

}


/* =========================
   FINAL AI SKIN SCANNER
========================= */

async function startScan(){

  const video =
  document.getElementById(
    "scanVideo"
  );

  if(!video){
    return;
  }

  try{

    const stream =
    await navigator
    .mediaDevices
    .getUserMedia({

      video:true,
      audio:false

    });

    video.srcObject = stream;

    video.play();

    setTimeout(()=>{

      showSkinResult();

    },3000);

  }

  catch(error){

    alert(
      "❌ Camera Permission Denied"
    );

    console.log(error);

  }

}

/* =========================
   AI RESULT
========================= */

function showSkinResult(){

  const problems = [

    {
      name:"Pimples",

      img:"https://t4.ftcdn.net/jpg/02/60/34/29/360_F_260342965_LhHrUSQxK8UeXXzwN5BnsriCShRqj6cv.jpg",

      doctor:"Dr. Anjali Patne",

      solution:"Drink more water & avoid oily food"
    },

    {
  name:"Dark Spots",

  img:"https://evenlyclinic.com/wp-content/uploads/2025/04/Untitled-design-7.webp",

  doctor:"Dr. Neha Pawar",

  solution:"Use Vitamin C & proper sleep"
},
    {
      name:"Dry Skin",

      img:"https://media.istockphoto.com/id/467680200/photo/dry-skin-detail.jpg?s=612x612&w=0&k=20&c=aXSVku85-Zw67EULNyixsGY-2xnaV0fa9tRGoAvdKFA=",

      doctor:"Dr. Sharma",

      solution:"Use moisturizer daily"
    }

  ];

  let html = "";

  problems.forEach(item=>{

    html += `

    <div class="skin-card">

      <img src="${item.img}">

      <h2>
        ${item.name}
      </h2>

      <p>
        👨‍⚕ Doctor :
        ${item.doctor}
      </p>

      <p>
        💡 ${item.solution}
      </p>

    </div>

    `;

  });

  document
  .getElementById(
    "scanResult"
  )
  .innerHTML = html;

}

function triggerEmergencyMode() {

  // theme change
  document.body.classList.add("emergency-mode");

  // banner create
  const banner = document.createElement("div");
  banner.className = "emergency-banner";
  banner.innerText = "🚨 EMERGENCY ALERT - PRIORITY PATIENT DETECTED";

  document.body.appendChild(banner);

  // voice alert
  const speech = new SpeechSynthesisUtterance(
    "Emergency patient detected. Doctor attention required immediately."
  );

  speech.lang = "en-US";
  speechSynthesis.speak(speech);

  // auto remove after 5 sec
  setTimeout(() => {
    banner.remove();
    document.body.classList.remove("emergency-mode");
  }, 5000);
}

function speakAboutSite(){

  const msg = new SpeechSynthesisUtterance(

    "Namaste. Yeh Smart Hospital AI System hai. " +
    "Yahaan emergency patients ko sabse pehle priority milti hai. " +
    "Smart appointment system automatically token generate karta hai. " +
    "AI face scanner patient ki condition detect karta hai. " +
    "Live tracking se hospital ke andar patient ka location pata chalta hai. " +
    "Ambulance aur ICU system real time connect hota hai. " +
    "Yeh hospital future healthcare system ko represent karta hai."

  );

  msg.lang = "hi-IN";
  msg.rate = 0.9;

  speechSynthesis.speak(msg);
}

function show(id){

  document.querySelectorAll('.page')
  .forEach(p => p.style.display = 'none');

  document.getElementById(id).style.display = 'block';

  if(id === "about"){
    setTimeout(()=>{
      speakAboutSite();
    },1000);
  }
}

function speak(text){

  // stop previous voice (IMPORTANT FIX)
  window.speechSynthesis.cancel();

  let msg = new SpeechSynthesisUtterance(text);

  msg.lang = "hi-IN";   // Hindi voice
  msg.rate = 0.9;
  msg.pitch = 1;

  // some browsers need this delay
  setTimeout(() => {
    window.speechSynthesis.speak(msg);
  }, 200);

}


let slides = [
  {
    title: "Smart Hospital Project",
    text: "Ye AI based hospital system hai jo patient ko smart treatment deta hai"
  },
  {
    title: "AI Features",
    text: "Face scan, mood detection aur doctor suggestion system available hai"
  },
  {
    title: "Emergency System",
    text: "Emergency patient ko automatic priority milti hai"
  },
  {
    title: "Live Tracking",
    text: "Patient hospital ke andar live track hota hai"
  },
  {
    title: "Future Hospital System",
    text: "Ye system India ke smart hospitals ka future hai"
  }
];

let i = 0;

function startTV(){

  let title = document.getElementById("slideTitle");
  let text = document.getElementById("slideText");

  let current = slides[i];

  title.innerText = current.title;
  text.innerText = current.text;

  // 🔥 VOICE CALL FIXED
  speak(current.title + ". " + current.text);

  i++;

  if(i >= slides.length){
    i = 0;
  }

  setTimeout(startTV, 5000);
}

/* =========================
   LIVE AI HOSPITAL DATA
========================= */

setInterval(()=>{

  document.getElementById(
    "livePatients"
  ).innerHTML =

  Math.floor(
    80 + Math.random()*50
  );

  document.getElementById(
    "icuLoad"
  ).innerHTML =

  Math.floor(
    50 + Math.random()*40
  ) + "%";

  document.getElementById(
    "doctorOnline"
  ).innerHTML =

  Math.floor(
    10 + Math.random()*15
  );

},4000);


/* =========================
   AI HOSPITAL VOICE
========================= */

function commandCenterVoice(){

  window.speechSynthesis.cancel();

  const speech =

  new SpeechSynthesisUtterance(

    "Emergency patient detected. AI hospital command center activated."

  );

  speech.lang = "en-US";

  speech.rate = 0.9;

  speech.pitch = 1;

  speech.volume = 1;

  speechSynthesis.speak(speech);

}

setTimeout(()=>{

  commandCenterVoice();

},3000);

/* =========================
   LIVE BED UPDATE
========================= */

setInterval(()=>{

  document.getElementById(
    "icuBeds"
  ).innerHTML =

  Math.floor(
    5 + Math.random()*20
  );

  document.getElementById(
    "oxygenBeds"
  ).innerHTML =

  Math.floor(
    10 + Math.random()*40
  );

  document.getElementById(
    "ventilatorBeds"
  ).innerHTML =

  Math.floor(
    2 + Math.random()*10
  );

},4000);


/* =========================
   AMBULANCE ETA
========================= */

let eta = 5;

setInterval(()=>{

  eta--;

  if(eta <= 0){

    eta = 5;

  }

  document.getElementById(
    "etaTime"
  ).innerHTML =

  "ETA : " + eta + " Minutes";

},1000);


/* =========================
   SENIOR PRIORITY AI
========================= */

function checkSeniorCitizen(age){

  if(age >= 60){

    alert(
      "👴 Senior Citizen Priority Activated"
    );

    const speech =

    new SpeechSynthesisUtterance(

      "Senior citizen priority activated"

    );

    speech.lang = "en-US";

    speechSynthesis.speak(speech);

  }

}


/* =========================
   SMART APPOINTMENT SYSTEM
========================= */

function bookSmartAppointment(){

  const name =
  document.getElementById(
    "smartPatientName"
  ).value;

  const age =
  document.getElementById(
    "smartPatientAge"
  ).value;

  const blood =
  document.getElementById(
    "smartBloodGroup"
  ).value;

  const disease =
  document.getElementById(
    "smartDisease"
  ).value;

  const emergency =
  document.getElementById(
    "smartEmergencyLevel"
  ).value;

  const doctor =
  document.getElementById(
    "smartDoctorSelect"
  ).value;

  if(name === ""){

    alert("Enter Patient Name");
    return;

  }

  // TOKEN

  const token =
  Math.floor(
    1000 + Math.random()*9000
  );

  // AI RESULT

  document.getElementById(
    "smartAiResult"
  ).innerHTML = `

    <h2>
      ✅ Appointment Confirmed
    </h2>

    <br>

    👤 ${name}

    <br><br>

    🎟 Token :
    ${token}

    <br><br>

    🦠 ${disease}

    <br><br>

    👨‍⚕ ${doctor}

    <br><br>

    🚨 ${emergency}

  `;

  // SAVE TOTAL

  let total =
  localStorage.getItem(
    "smartTotalPatients"
  );

  if(total == null){

    total = 0;

  }

  total++;

  localStorage.setItem(
    "smartTotalPatients",
    total
  );

  // NORMAL / EMERGENCY

  if(emergency === "Emergency"){

    let emergencyCount =
    localStorage.getItem(
      "smartEmergencyPatients"
    );

    if(emergencyCount == null){

      emergencyCount = 0;

    }

    emergencyCount++;

    localStorage.setItem(
      "smartEmergencyPatients",
      emergencyCount
    );

  }

  else{

    let normalCount =
    localStorage.getItem(
      "smartNormalPatients"
    );

    if(normalCount == null){

      normalCount = 0;

    }

    normalCount++;

    localStorage.setItem(
      "smartNormalPatients",
      normalCount
    );

  }

  // OPERATION

  if(

    disease === "Heart Attack" ||

    disease === "Bone Fracture" ||

    disease === "Accident Injury"

  ){

    let operations =
    localStorage.getItem(
      "smartOperations"
    );

    if(operations == null){

      operations = 0;

    }

    operations++;

    localStorage.setItem(
      "smartOperations",
      operations
    );

  }

  // UPDATE DASHBOARD

  loadHospitalAnalytics();

  // AI VOICE

  const speech =
  new SpeechSynthesisUtterance(

    name +

    " ji ka appointment successfully booked ho gaya hai"

  );

  speech.lang = "hi-IN";

  speech.rate = 0.9;

  speechSynthesis.speak(speech);

}

/* =========================
   LOAD ANALYTICS
========================= */

function loadHospitalAnalytics(){

  document.getElementById(
    "totalSmartAppointments"
  ).innerHTML =

  localStorage.getItem(
    "smartTotalPatients"
  ) || 0;

  document.getElementById(
    "totalEmergencyPatients"
  ).innerHTML =

  localStorage.getItem(
    "smartEmergencyPatients"
  ) || 0;

  document.getElementById(
    "totalNormalPatients"
  ).innerHTML =

  localStorage.getItem(
    "smartNormalPatients"
  ) || 0;

  document.getElementById(
    "totalOperations"
  ).innerHTML =

  localStorage.getItem(
    "smartOperations"
  ) || 0;

}

/* =========================
   AUTO LOAD
========================= */

window.addEventListener(

  "load",

  ()=>{

    loadHospitalAnalytics();

  }

);
function getSuggestion() {
  let text = document.getElementById("symptomInput").value.toLowerCase();
  let output = "";

  if (text.includes("chest") || text.includes("heart")) {
    output = "🫀 Go to Cardiology Department";
  }
  else if (text.includes("fever") || text.includes("cold")) {
    output = "🩺 Go to General Medicine";
  }
  else if (text.includes("bone") || text.includes("fracture")) {
    output = "🦴 Go to Orthopedics";
  }
  else {
    output = "🏥 Please consult General OPD";
  }

  document.getElementById("aiSuggestion").innerText = output;
}