var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social-todo');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    email: String,
    ame:   String,
    hashed_password:    String
});

module.exports = mongoose.model('Users', UserSchema);