const { Router } = require("express");

const router = Router();
const admin = require("firebase-admin")
const MqttLab = require('./mqttLab')

var mqttTest = new MqttLab()
// var serviceAccount = require(process.env.GOOGLE_APPLICATIONS_CREDENTIALS);
var serviceAccount = require("../../remoteyoulab-firebase-adminsdk-y1zfv-ef1eb24613.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://remoteyoulab.firebaseio.com/"
});

const db = admin.database();

router.post("/send-mqtt", (req, res) => {
    mqttTest.sendMqtt("lab1","off")
    res.redirect("/")
});

router.post("/send-mqtt", (req, res) => {
    mqttTest.mqttEcho()
    mqttTest.sendMqtt("lab2","on")
    res.redirect("/")
});

router.get("/", (req, res) => {
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
    res.render("index", { lab1: lab1, lab2: lab2, lab3: lab3 });
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
