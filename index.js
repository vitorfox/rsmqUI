var express = require("express");
var app = express();

/* serves main page */
app.get("/", function(req, res) {
  res.send("OK");
});

app.post("/user/add", function(req, res) {
/* some server side logic */
  res.send("OK");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
