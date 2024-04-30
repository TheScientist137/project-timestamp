// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// Check for invalid date
const isInvalidDate = (date) => date.toUTCString() === 'Invalid Date';

// Date route
app.get("/api/:date", (req, res) => {
  // El operador + covierte el dato en numero
  const date = new Date(+req.params.date);

  // If is still a invalid date
  if (isInvalidDate(date)) {
    res.json({ error: 'Invalid Date' });
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// API empty route
app.get('/api', (req, res) => {
  // if no date is provided we show the current time
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})


// Listen on port set in environment variable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
