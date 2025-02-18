// server.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  // const regex = /\d{4,6}[-.]\d{2}[.-]\d{2}/;
  const regex = /^\d+$/;
  console.log(req.params);
  if (regex.test(req.params.date)) {
    var d = parseInt(req.params.date);
  } else {
    var d = req.params.date;
  }
  const date = new Date(d);
  console.log(d);
  if (date == "Invalid Date") {
    if (!d) {
      var unix = new Date().getTime();
      var utc = new Date().toGMTString();
      res.json({ unix: unix, utc: utc });
    } else res.json({ error: "Invalid Date" });
  } else {
    var unix = new Date(d).getTime();
    var utc = new Date(d).toGMTString();
    res.json({ unix: unix, utc: utc });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
