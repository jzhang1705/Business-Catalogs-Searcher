/*
var express = require('express');
var app = express();
app.listen(3000, () => console.log('listening at 3000'));
// POST method route
app.post('/MongoAPI', (request, response) => {
  console.log(request);
});
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
// connect to a database
// mongodb://<user>:<password>@<host>/<database>
mongoose.connect('mongodb+srv://VSC:528491@summer2020-qvltj.mongodb.net/BusinessCatalog?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){});
// use express-sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// serve static files from template
app.use(express.static(__dirname + '/views'));
// include routes
var routes = require('./routes/router');
app.use('/', routes);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});
// error handler, define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});
// listen on port 3210
app.listen(3210, function () {
  console.log('Listening on port 3210...');
});
*/

// POST method implementation:
const express = require('express');
const app = express();
var port = 3000;
app.use(express.static(__dirname));
app.use(express.json(
  {
      type: ['application/json', 'text/plain']
  }
));

app.listen(port, () => console.log('listening at ' + port));
app.use(express.static('public'));

app.post('/api', (request, response) => {
  insertData(request.body);
});


function insertData(data){
  'use strict'

  var MongoClient = require('mongodb').MongoClient;
  const uri = "mongodb+srv://VSC:528491@summer2020-qvltj.mongodb.net/BusinessCatalog?retryWrites=true&w=majority";
  const bcrypt = require("bcrypt");
  const saltRounds = 10;
  const response = {statusCode: 200, body: JSON.stringify('Insert completed')};

  let atlas_connection_uri;
  let cachedDb = null;

  exports.handler = (event, context, callback) => {
          atlas_connection_uri = uri;
          console.log('the Atlas connection string is ' + atlas_connection_uri);
          processEvent(event, context, callback);
  };

  function processEvent(event, context, callback) {
      console.log('Calling MongoDB Atlas from AWS Lambda with event: ' + JSON.stringify(event));
      var jsonContents = JSON.parse(event.body);
      //Used for inserting into database
      MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
          var dbo = db.db("BusinessCatalog");
          console.log(event.body)
          if(jsonContents.password !=null){
          }
          bcrypt
          .genSalt(saltRounds)
          .then(salt => {
          console.log(`Salt: ${salt}`);
          return bcrypt.hash(jsonContents.password, salt);
          })
          .then(hash => {
          jsonContents.password = hash;
          dbo.collection("logins").insertOne(jsonContents, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          });
          db.close();
          })
          });
        
          return response;

  }
}
