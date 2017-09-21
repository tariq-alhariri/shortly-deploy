var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var mongoose=require('mongoose');
var userSchema=mongoose.Schema({

username:{type: String,index:{unique:true}},
password:String
});
var User = mongoose.model('User',userSchema);
  User.prototype.comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      if(err){
        callback(err)
      }else{
        callback(null,isMatch );
      }
      callback(isMatch);
    });
  },

userSchema.pre('save',function(next) {
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.password, null, null).bind(this)
      .then(function(hash) {
        this.password= hash;
        next();
      });
  });


module.exports = User;
