var express = require('express')
var app = express()

var stockName = function (req, res, next) {
    console.log("\t=================");
    console.log("\tRequest Received!");
    console.log("\t=================");
    console.log(Date.now())
    console.log(req.body);
    next()
}

app.use(stockName)

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})
