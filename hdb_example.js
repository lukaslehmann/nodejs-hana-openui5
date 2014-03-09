//needed modules
var express = require("express");
var app = express()
  , server = require('http').createServer(app);
var pool = require('./libs/pool.js');
var util = require('util');

//configure the express settings
app.configure(function () {
  //vies are in folder views
  app.set('views', __dirname + '/views'); 
  //we use jade as view engine
  app.set('view engine', 'jade'); 
  app.use(app.router);
  //all the scripts we need for the client UI are in folder public
  app.use(express.static(__dirname + '/public')); 
});

//set the ajax request URL
if(process.env.VCAP_APPLICATION){
  //app is running in the cloud
  var application = JSON.parse(process.env.VCAP_APPLICATION);
  var uris = application['uris'][0];
  var url = "http://" + uris;
}
else{
  //for local testing
  var url = "http://localhost:3000";
}

//start server, on CF use binded port
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Listening on " + url + port);
  console.log(pool.getPoolSize() + " running hdb clients");
});

//get main - index
app.get('/', function(req, res) {
  res.render('index', { req_url: url });
});

//return JSON for requests on app/search?name=
app.get('/search', function(req, res){
  var name = req.query.name;
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //execute the prepared statement
  req_statement.exec([name], function (err, rows) {
    if (err) {
      return console.error('Error:', err);
    }
    else {
      //return results as response
      res.send(rows);  
    } 
  });
});

