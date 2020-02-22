var mqtt = require('mqtt')

var options={
    clientId:"mqttjs01",
    username:"obpkkwdc",
    password:"1lUnSF15XpWM",
    port: 14222,
    clean:true};

var client = mqtt.connect("mqtt://soldier.cloudmqtt.com",options)
 
client.on('connect', function () {
  client.subscribe('remotelab/status/', function (err) {
    if (!err) {
      client.publish('remotelab/status/', 'on')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})