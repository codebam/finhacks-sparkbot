var http = require('http');
var https = require('https');

var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var optionsMessageDetails = {
    host: 'api.ciscospark.com',
    path: '',
    method: 'GET',
    json: true,
    headers: { 
	'Content-Type': 'application/json; charset=utf-8',
	'Authorization': 'Bearer OWIyNDZmZjAtMTI5OS00ODk5LWExMWUtZDA3NTQ2MzIzM2RiYWRhY2UxNGYtZjMw'
     }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', upload.array(), function (req, res) {
    var inJSONBody = req.body;
    var messageId = inJSONBody['data']['id'];
    console.log(messageId);
    optionsMessageDetails['path'] = '/v1/messages/' + messageId;
    console.log(optionsMessageDetails);
    var messageDetailsJSON = https.get(optionsMessageDetails, function(elem) {
	var bodyParser = require('body-parser')	
	app.use(bodyParser.json());
	console.log(elem.body);
    });	
    res.json(req.body);
})

app.listen(80, function () {
  console.log('Example app listening on port 80!')
})

