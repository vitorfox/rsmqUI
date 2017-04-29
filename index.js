var express = require("express");
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}))

var RedisSMQ = require("rsmq")
var rsmq = new RedisSMQ({
  host: process.env.REDIS_HOST     || "redis",
  port: process.env.REDIS_PORT     || 6379,
  ns:   process.env.RSQM_NAMESPACE || "rsmq",
})

/* serves main page */
app.get("/", function(req, res) {
  rsmq.listQueues( function (err, queues) {
    if(err){
      console.error(err)
      res.send(err);
      return
    }

    if (queues.length == 0) {
      res.send("No queues.");
    }

    var attrCount = 0
    var response = []
    var getAttrFinish = (item) => {
      attrCount++
      response.push(item)

      if (attrCount >= queues.length) {
        res.send(response)
      }
    }

    queues.forEach((item) => {
      rsmq.getQueueAttributes({qname:item}, function (err, resp) {
        getAttrFinish({queue: item, data:resp})
      })
    })
  })
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
