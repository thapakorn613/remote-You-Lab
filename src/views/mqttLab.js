var mqttLab = function() {};
var mqtt = require("mqtt");

module.exports = class mqttLab {
  mqttEcho() {}
  sendMqtt(nameLab, msg1) {
    var options = {
      clientId: "mqttjs01",
      username: "obpkkwdc",
      password: "1lUnSF15XpWM",
      port: 14222,
      clean: true
    };

    var client = mqtt.connect("mqtt://soldier.cloudmqtt.com", options);
    client.on("connect", function() {
      client.subscribe("remotelab/status/", function(err) {
        console.log("agag");
        if (!err) {
          client.publish("remotelab/status/" + nameLab, msg1);
        }
      });
    });

    client.on("message", function(topic, message) {
      // message is Buffer
      //   console.log("onConnect");
      console.log(message.toString());
      client.end();
    });
    client.disconnected();
    // client.end();
  }
};
