var mongoose = require('mongoose');

var profileSchema = new mongoose.Schema({
	name: String,
  sport: String,
  nationality: String,
  gender: String,
	dob: String,
	description: String,
  location: String,
	team: String,
	twitter: String,
	instagram: String,
	facebook: String,
	timestamp: {type : Date, default: Date.now}
});

var ProfileModel = mongoose.model('Profile', profileSchema);

module.exports = ProfileModel;
