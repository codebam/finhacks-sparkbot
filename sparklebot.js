var request = require('request');

var myJSONObject = {
  "roomId" : "Y2lzY29zcGFyazovL3VzL1JPT00vMDRhNzgwMTAtYWU3ZC0xMWU2LWI5YmQtY2QzZWI1OWE1YjFj",
  "toPersonId" : "Y2lzY29zcGFyazovL3VzL1BFT1BMRS80NDZkNTBhZi1mMjJmLTRmNzktYTMzZS1jNTllYzk2MmFhMmQ	",
  "toPersonEmail" : "bradymarkovich@trentu.ca",
  "text" : "Hey Brady",
  "markdown" : "**HEY BRADY**",
  "files" : []
};	
request({
    url: "https://api.ciscospark.com/v1/messages",
    method: "POST",
    json: true,   // <--Very important!!!
    body: myJSONObject
}, function (error, response, body){
    console.log(response);
});

