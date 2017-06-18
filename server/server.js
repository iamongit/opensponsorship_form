var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var mongoose = require('mongoose');
var Promise = require('bluebird');
// var envVars = require('../env.json');
var Profile = require('./dbController.js');


var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

var username = process.env.mlab_username;
// console.log(username, "uname here")
var password = process.env.mlab_password;
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${username}:${password}@ds131312.mlab.com:31312/opensponsorship`).then(
  () => { console.log('mongoose connected!')},
  err => { console.log('mongoose connection error!', err) }
);

app.use(express.static(path.join(__dirname, '../')));
var port = process.env.PORT ||  3000;
app.listen(port, function (error) {
	if(!error){
		console.log('OpenSponsorship listening on port ' + port);
	} else {
		console.log('Error connecting server')
	}

});

app.post('/api/insertProfile', function (req, res) {
	// console.log(req.body, "req here####")
	Profile.insertToDB(req, res);
});

app.get('/api/archives', function(req, res){
	Profile.getAllProfiles(req, res);
});

// require('./routes.js')(app, express);
