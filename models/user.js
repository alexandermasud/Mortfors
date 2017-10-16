var bcrypt = require('bcryptjs');

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const GoogleUserSchema = new Schema({
  googleID:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  image: {
    type:String
  }
});

// Create collection and add schema
mongoose.model('users', GoogleUserSchema);


var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	},
	address: {
		type: String
	},
	city: {
		type: String
	},
	phone: {
		type: String
	},
	email: {
		type: String
	},
});



var User = module.exports = mongoose.model('User', UserSchema);
module.exports.createUser = function(newUser, callback) {
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(newUser.password, salt, function(err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
}

module.exports.getUserByUsername = function(username, callback) {
	var query = {
		username: username
	};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
}