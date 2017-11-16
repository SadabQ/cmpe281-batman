var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});
//to get an encrypted password
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
};
//check if the password matches the hashed password, this here is the current password of user
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);