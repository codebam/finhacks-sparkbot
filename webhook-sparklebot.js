var http = require('http');
var https = require('https');
var request = require('request');

var express = require('express')
var app = express()

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var optionsMessageDetails = {
    host: 'api.ciscospark.com',
    path: '',
    url: '',
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
    console.log('messageId: ' + messageId);
    optionsMessageDetails['path'] = '/v1/messages/' + messageId;
    optionsMessageDetails['url'] = 'https://' + optionsMessageDetails['host'] + optionsMessageDetails['path'];
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
