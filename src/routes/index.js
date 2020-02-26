const { Router } = require("express");
var bodyParser = require("body-parser");


const router = Router();
const admin = require("firebase-admin");
const MqttLab = require("./mqttLab");

var mqttTest = new MqttLab();
// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
var serviceAccount = require("../../remoteyoulab-firebase-adminsdk-y1zfv-ef1eb24613.json");
var tempValueLab1 = "off";
var tempValueLab2 = "off";
var tempValueLab3 = "off";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://remoteyoulab.firebaseio.com/"
});

const db = admin.database();

router.post("/checkboxLab", function(req, res) {
  var valueLab1 = req.body.testLab1;
  var valueLab2 = req.body.testLab2;
  var valueLab3 = req.body.testLab3;
  console.log("test : ", req.body);
  if (req.body.testLab1 == undefined) {
    valueLab1 = "off";
  }
  if (req.body.testLab2 == undefined) {
    valueLab2 = "off";
  }
  if (req.body.testLab3 == undefined) {
    valueLab3 = "off";
  }
  console.log("valueLab1 : ", valueLab1);
  console.log("valueLab2 : ", valueLab2);
  console.log("valueLab3 : ", valueLab3);
  mqttTest.sendMqtt("lab1", valueLab1);
  mqttTest.sendMqtt("lab2", valueLab2);
  mqttTest.sendMqtt("lab3", valueLab3);
  tempValueLab1 = valueLab1;
  tempValueLab2 = valueLab2;
  tempValueLab3 = valueLab3;
  res.redirect("/");
});

router.post("/sendMqttOff", (req, res) => {
  //   console.log("ttgg : ");
  mqttTest.sendMqtt("lab1", "off");

  //   mqttTest.gtt("lab1");
  res.redirect("/");
});

router.post("/send-mqtt", (req, res) => {
  //   mqttTest.mqttEcho();
  mqttTest.sendMqtt("lab2", "on");
  res.redirect("/");
});

router.get("/", (req, res) => {
  console.log("lab1 : ", tempValueLab1);
  console.log("lab2 : ", tempValueLab2);
  console.log("lab3 : ", tempValueLab3);
  
  if (tempValueLab1 == "on") {
    var boolLab1 = new Boolean(true);
  } else {
    var boolLab1 = new Boolean(false);
  }
  if (tempValueLab2 == "on") {
    var boolLab2 = new Boolean(true);
  } else {
    var boolLab2 = new Boolean(false);
  }
  if (tempValueLab3 == "on") {
    var boolLab3 = new Boolean(true);
  } else {
    var boolLab3 = new Boolean(false);
  }
  db.ref().once("value", snap => {
    var lab1 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab1").val()
    );
    if (lab1 == "null") {
      lab1 = "";
    } else {
      lab1 = lab1.substring(1, lab1.length - 1);
    }

    var lab2 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab2").val()
    );
    var lab3 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab3").val()
    );

    if (lab2 == "null") {
      lab2 = "";
    } else {
      lab2 = lab2.substring(1, lab2.length - 1);
    }
    if (lab3 == "null") {
      lab3 = "";
    } else {
      lab3 = lab3.substring(1, lab3.length - 1);
    }
    res.render("index", {
      lab1: lab1,
      lab2: lab2,
      lab3: lab3,
      statusLab1: tempValueLab1,
      statusLab2: tempValueLab2,
      statusLab3: tempValueLab3
    });
  });

  // res.render('index')
  console.log("Index work!");
  // res.send('received')
});

router.post("/new-set-lab1", (req, res) => {
  db.ref().once("value", snap => {
    var lab2 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab2").val()
    );
    if (lab2 == "null") {
      lab2 = "";
    } else {
      lab2 = lab2.substring(1, lab2.length - 1);
    }
    var lab3 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab3").val()
    );
    if (lab3 == "null") {
      lab3 = "";
    } else {
      lab3 = lab3.substring(1, lab3.length - 1);
    }
    db.ref("remoteLab-link-youtube").set({
      linkLab1: req.body.linkLab1,
      linkLab2: lab2,
      linkLab3: lab3
    });
    res.redirect("/");
  });
  //   res.redirect("/");
});
router.post("/new-set-lab2", (req, res) => {
  db.ref().once("value", snap => {
    var lab1 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab1").val()
    );
    if (lab1 == "null") {
      lab1 = "";
    } else {
      lab1 = lab1.substring(1, lab1.length - 1);
    }
    var lab3 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab3").val()
    );
    if (lab3 == "null") {
      lab3 = "";
    } else {
      lab3 = lab3.substring(1, lab3.length - 1);
    }
    db.ref("remoteLab-link-youtube").set({
      linkLab1: lab1,
      linkLab2: req.body.linkLab2,
      linkLab3: lab3
    });
    res.redirect("/");
  });
  //   res.redirect("/");
});

router.post("/new-set-lab3", (req, res) => {
  db.ref().once("value", snap => {
    var lab1 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab1").val()
    );
    if (lab1 == "null") {
      lab1 = "";
    } else {
      lab1 = lab1.substring(1, lab1.length - 1);
    }
    var lab2 = JSON.stringify(
      snap.child("remoteLab-link-youtube/linkLab2").val()
    );
    if (lab2 == "null") {
      lab2 = "";
    } else {
      lab2 = lab2.substring(1, lab2.length - 1);
    }
    db.ref("remoteLab-link-youtube").set({
      linkLab1: lab1,
      linkLab2: lab2,
      linkLab3: req.body.linkLab3
    });
    res.redirect("/");
  });
  //   res.redirect("/");
});

router.get("/delete-contact/:id", (req, res) => {
  db.ref("remoteLab-link-youtube/" + req.params.id).remove();
  res.redirect("/");
});

module.exports = router;
