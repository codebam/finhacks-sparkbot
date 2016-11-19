var express = require('express')
var app = express()
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', upload.array(), function (req, res) {
  
    console.log(req.body);
    res.json(req.body);
})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})
