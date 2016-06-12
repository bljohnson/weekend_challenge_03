var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

app.use(express.static('public')); // allow use of static files in public folder

var server = app.listen(process.env.PORT||3000, function() {
  console.log('listening on port');
}); //end of app.listen

app.get('/', function(req,res) {
  console.log('getting is good');
  res.writeHead(200);
  res.write('It lives!');
  res.end();
}); //end of base app.get

app.get('/index', function (req, res) {
  res.sendFile(path.resolve('public/view/index.html'));
}); // end of /index app.get

// app.get('/pathGet', function (req, res) {
//   res.write('Sup fresh');
//   res.end();
// });//end of /pathGet app.get


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(express.bodyParser());

// app.use(bodyParser.urlencoded());

app.post('/pathPost', urlencodedParser, function( req, res ){
  var test = Number(req.body.firstNumber) + Number(req.body.secondNumber);
  var returnTest = test.toString();
  res.write( 'Answer is: ' + returnTest );
  res.end();
}); // end of /pathPost app.post
