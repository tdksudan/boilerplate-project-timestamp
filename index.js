// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// Helper function to check for invalid date
const isInvalidDate = (date) => date.toString() === "Invalid Date";

// Root endpoint
app.get("/api/:date?", (req, res) => {
  const dateparam = req.params.date;
  let date;

  if (!dateparam) {
    // Handle empty date parameter
    date = new Date();
  } else if (!isNaN(dateparam)) {
    // Handle Unix timestamp
    date = new Date(parseInt(dateparam));
  } else {
    // Handle date string
    date = new Date(dateparam);
  }

  if (isInvalidDate(date)) {
    res.json({ error: "Invalid Date" });
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
