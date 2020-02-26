<script src="./mqttws31.js"></script>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js" type="text/javascript"></script>-->
<script>
client = new Paho.MQTT.Client("broker.mqttdashboard.com", Number(8000), "clientIdbank");
client = new Paho.MQTT.Client("35.198.231.150", 9001,"AAA9999");
//client = new Paho.MQTT.Client("soldier.cloudmqtt.com", 30420,"bank89899");
//client = new Paho.MQTT.Client("soldier.cloudmqtt.com", /*30420*/34222,"789");
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

//client.connect({onSuccess:onConnect});
var options = {
  useSSL: true,
  /*userName: "vpfewsse",
  password: "gNAs763mxcGN",*/
  userName: "obpkkwdc",
  password: "1lUnSF15XpWM",
  onSuccess:onConnect
}

  // connect the client
client.connect(options);

function onConnect() {
  console.log("onConnect");
  client.subscribe("remotelab/Lab2");
  //message = new Paho.MQTT.Message("Hello GoGo I'm mqtt message");
  //message.destinationName = "testGogo/MQTT";
  //client.send(message);
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
  //document.getElementById("demo").innerHTML = message.payloadString;
}
</script>