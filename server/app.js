var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var calculateStuff = require('../modules/calculation.js');

var urlencodedParser = bodyParser.urlencoded({extended:false});

var server = app.listen(process.env.PORT||3000, function() {
  console.log('listening on port');
}); //end of app.listen

app.use(express.static('public')); // allow use of static files in public folder

app.get('/index', function (req, res) {
  res.sendFile(path.resolve('public/view/index.html'));
}); // end of /index app.get

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.bodyParser());

// app.use(bodyParser.urlencoded());

app.post('/pathPost', urlencodedParser, function(req,res) {
  var uno = Number(req.body.input1);
  var dos = Number(req.body.input2);
  res.write('Answer: ' + calculateStuff(uno, dos, req.body.doThis));
  res.end();
}); // end of /pathPost app.post
