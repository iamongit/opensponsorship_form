var Q = require('q');
var ProfileModel = require('./DB/models/profileModel.js');

// Promisify mongoose methods with `q` promise library
var findAllSearches = Q.nbind(ProfileModel.find, ProfileModel);
var findOne = Q.nbind(ProfileModel.findOne, ProfileModel);
var saveASearch = Q.nbind(ProfileModel.create, ProfileModel);
var empty = Q.nbind(ProfileModel.remove, ProfileModel);


module.exports = {
  insertToDB: function(req, res){
    console.log(req.body.profileObject, "req in db CONTROLLER #####")
    var profileObject = req.body.profileObject;
    new ProfileModel(profileObject)
      .save(function (error) {
       if (error) {
         console.log(error);
         res.status(400).send('whoops, insertion failed!');
       } else{
         console.log('Item saved in database');
         res.send('Profile Saved');
       }
    });
  },

  getAllProfiles: function(req, res){
    findAllSearches( { } )
      .then(function(returnedObj) {
        console.log(returnedObj, "response from mongo")
        res.send(returnedObj);
      })
      .fail(function (error) {
        res.status(400).send('whoops');
      });
  }
}
