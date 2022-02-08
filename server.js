var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true } ) );

// console.log("declared vars");
app.use(express.static(__dirname + '/public'));

// console.log("ran middleware");

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});


// If nothing is typed in /api/:date, then it returns the current datetime
app.get('/api', function(req, res) {
  currDate = new Date();
  res.json({"unix":currDate.getTime(),
            "utc":currDate});
});

//Valid datetimes should send JSON with Date object. Integers should be
//seen as milisseconds and converted to datetimes
app.get('/api/:date?', function(req, res) {
  // console.log("typeof: " + typeof(Number(req.params.date)));
  // console.log(Number(req.params.date));
  if (Number(req.params.date).toString() === 'NaN') {
    let timestamp = new Date(req.params.date);
    if (timestamp.toString() === "Invalid Date") {
      res.json({error:"Invalid Date"});
    }
    else {
      let timestamp = new Date(req.params.date);
      console.log("it thinks its a datetime");
      res.json({
      unix:timestamp.getTime(),
      utc:timestamp.toString()
      });
    }
  }
  else {
    console.log("it thinks its a number");
    let timestamp = new Date();
    timestamp.setTime(Number(req.params.date));
    res.json(
     {unix:Number(req.params.date),
      utc:timestamp.toString()
    });
  }
});

// console.log("set up html to GET requests");

var listener = app.listen(3000, function () {
  console.log("Node.js listening on port " + listener.address().port);
});

//Licoes

/* console.log("O objeto Date nao e maleavel como construtor. Chamar Date(123) e' a mesma coisa que chamar Date(). : " + Date(2011-02-03)); */