var http = require('http');
var https = require('https');
var request = require('request');

var express = require('express');
var app = express();

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

var googleFinanceAPI = {
    host: 'finance.google.com',
    path: '',
    url: '',
    method: 'GET',
    json: true,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    }
};

var jsonParser = (bodyParser.json());

app.post('/', jsonParser, function(req, res) {
    var inJSONBody = req.body;
    var messageId = inJSONBody['data']['id'];
    console.log('messageId: ' + messageId);
    optionsMessageDetails['path'] = '/v1/messages/' + messageId;
    optionsMessageDetails['url'] = 'https://' + optionsMessageDetails['host'] + optionsMessageDetails['path'];
    request.get(optionsMessageDetails, function(error, response, body) {
        console.log('text: ' + response.toJSON()['body']['text']);
    });
})

function get_stock_price(stock_code) {
    var stocks_dict = new Array();
    for (var i = 0; i < stock_code.length; i++) {
        var inJSONBody = req.body;
        var messageId = inJSONBody['data']['id'];
        console.log('messageId: ' + messageId);
        optionsMessageDetails['path'] = '/finance/info?client=ig&q=' + stock_code[i];
        optionsMessageDetails['url'] = 'https://' + optionsMessageDetails['host'] + optionsMessageDetails['path'];
        request.get(optionsMessageDetails, function(error, response, body) {
            console.log('text: ' + response.toJSON()['body']['text']);
        });
    }
}

app.listen(80, function() {
    console.log('-----------------------------------');
    console.log(' Example app listening on port 80!');
    console.log('-----------------------------------');
})
