var express = require('express')
var path = require ('path')
var app = express()
var firebase = require('firebase');

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

var config = {
    apiKey: "AIzaSyAywWSarXWDKgjP7S44bJvbWNqjYGY02ZU",
    authDomain: "openseats-2018.firebaseapp.com",
    databaseURL: "https://openseats-2018.firebaseio.com",
    storageBucket: "openseats-2018.appspot.com"
  };
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
  

app.get('/', function (req, res, next) {
  res.sendFile(__dirname + "/views/index.html")
});

app.get('/profile', function(req,res,next) {
  res.sendFile(__dirname + '/views/profile.html');
})


app.post('/profile', function(request, response){
  response.sendFile(__dirname + '/views/join.html');
  var newUser = firebase.database().ref().push();
  var postId = newUser.key;

  firebase.database().ref("users/" + request.body.name.toString()).set({
    name: request.body.name,
    description: request.body.description,
    age: request.body.age,
    postId: postId,
    });
});

  
app.get('/invites', function(req,res,next){
  res.sendFile(__dirname + '/views/invites.html');
})
app.get('/join', function(req,res,next) {
  res.sendFile(__dirname + '/views/join.html');
})


app.post('/join', function(request, response){
  var pos = (request.body.position);
  response.send("response recieved");
  firebase.database().ref("locations/").push({
    position: pos,
  });
});

app.get('/add', function(req,res,next) {
  res.sendFile(__dirname + '/views/add.html');
})

app.post('/add', function(request, response){
  var newUser = firebase.database().ref().push();
  var postId = newUser.key;

  response.send("response recieved");
  firebase.database().ref("events/" + request.body.address).set({
    address: request.body.address,
    apptTime: request.body.appt_time,
    date: request.body.mDate,
    postId: newUser.key,
  });
});



app.listen(3000, function(){
  console.log("Server running.." )
});
