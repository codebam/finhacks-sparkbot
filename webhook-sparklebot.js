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


var MarkItOnDemandAPI = {
    host: 'dev.markitondemand.com/Api',
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
    optionsMessageDetails['url'] += messageId;
    request.get(optionsMessageDetails, function(error, response, body) {
        if (response.toJSON()['body']['text'] !== 'undefined') {
            post_message(get_stock_price(response.toJSON()['body']['text']), response.toJSON()['body']['roomId']);
        }
    });
})


function get_lookup_stock(stock_name) {
    if (stock_name === '') {
        return [];
    };
    MarkItOnDemandAPI['path'] = '/v2/Lookup/json?input=' + stock_name;
    console.log(MarkItOnDemandAPI['url'] = 'http://' + MarkItOnDemandAPI['host'] + MarkItOnDemandAPI['path']);
    MarkItOnDemandAPI['url'] = 'http://' + MarkItOnDemandAPI['host'] + MarkItOnDemandAPI['path'];
    request.get(MarkItOnDemandAPI, function(error, response, body) {
        console.log(response);
        console.log(response.toJSON()[0]["Symbol"]);
        console.log(response.toJSON());
        return response.toJSON()[0]["Symbol"];
    });
};


function get_stock_price(stock_code) {
    console.log(stock_code);
    stock_code = get_lookup_stock(stock_code);
    console.log(stock_code);
    var stocks_dict = new Array();
    for (var i = 0; i < stock_code.length; i++) {
        googleFinanceAPI['path'] = '/finance/info?client=ig&q=' + stock_code[i];
        googleFinanceAPI['url'] = 'https://' + googleFinanceAPI['host'] + googleFinanceAPI['path'];
        request.get(googleFinanceAPI, function(error, response, body) {
            console.log('text: ' + response.toJSON()['body']['text']);
        stocks_dict[stocks_dict[i]] = stocks_dict[i]['l_cur'];
        });
        return stocks_dict;
    };
};



function post_message(message_text, roomid) {
        var myJSONObject = {
          "roomId": roomid,
          "text": message_text,
        };
        request({
            url: "https://api.ciscospark.com/v1/messages",
            method: "POST",
            json: true,   // <--Very important!!!
            body: myJSONObject,
            headers: {
                    'Content-Type': "application/json; charset=utf-8",
                    'Authorization': "Bearer OWIyNDZmZjAtMTI5OS00ODk5LWExMWUtZDA3NTQ2MzIzM2RiYWRhY2UxNGYtZjMw"
            }
        }, function (error, response, body){
                console.log(myJSONObject);
                console.log(message_text);
                console.log(roomid);
                console.log(response);
        });
}


app.listen(80, function() {
    console.log('-----------------------------------');
    console.log(' Example app listening on port 80!');
    console.log('-----------------------------------');
})
