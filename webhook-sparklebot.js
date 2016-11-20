var http = require('http');
var https = require('https');
var request = require('request');

var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//object for GET message details **HTTPS REQUIRED**
var optionsMessageDetails = {
    url: 'https://api.ciscospark.com/v1/messages/',
    method: 'GET',
    json: true,
    headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Authorization': 'Bearer OWIyNDZmZjAtMTI5OS00ODk5LWExMWUtZDA3NTQ2MzIzM2RiYWRhY2UxNGYtZjMw'
     }
};

var jsonParser = (bodyParser.json());
var jsonParser2 = (bodyParser.json());
var urlencodedParser = (bodyParser.urlencoded({ extended: true }));

app.post('/', jsonParser, function (req, res) {
    var inJSONBody = req.body;
    var messageId = inJSONBody['data']['id'];
    //console.log('messageId: ' + messageId);
    optionsMessageDetails['url'] += messageId;
    //console.log('builtUrl: ' + optionsMessageDetails['url']);
    var messageDetailsJSON = request.get(optionsMessageDetails, function(error, response, body) { 
            console.log('text: ' + response.toJSON()['body']['text']);
    }); 
    //console.log(messageDetailsJSON);
    res.json(req.body);
})

app.listen(80, function () {
    console.log('-----------------------------------');
    console.log(' Example app listening on port 80!');
    console.log('-----------------------------------');
})
