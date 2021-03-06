var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser'); // required for POSTing; populates req.body, allows us to hide data when posting
var calculateStuff = require('../modules/calculation.js');

var urlencodedParser = bodyParser.urlencoded({extended:false});// required fpr POSTing; populates req.body, parses urlencoded bodies only. new body object containing parsed data is populated on request object. object contains key-value pairs where value can be string or array (since extended: false)

var server = app.listen(process.env.PORT||3000, function() {
  console.log('listening on port');
}); //end of app.listen

app.use(express.static('public')); // allow use of static files in public folder

app.get('/', function (req, res) {
  res.sendFile(path.resolve('public/view/index.html'));
}); // end of / app.get

app.post('/pathPost', urlencodedParser, function(req,res) {
  var uno = Number(req.body.input1);
  var dos = Number(req.body.input2);
  res.write('Answer: ' + calculateStuff(uno, dos, req.body.oper)); // this represents the contents of the response parameter in client.js. req.body.oper is a string, so don't need to conver to Number and then back to string
  res.end();
}); // end of /pathPost app.post
