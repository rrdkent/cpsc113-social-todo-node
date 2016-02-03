var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/social-todo');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

//Validation goes here:
var StringField = {
    type: String,
    minlength: 1,
    maxlength: 51
}





var UserSchema = new Schema({
    email:  {
        type: String,
        minlength: 1,
        maxlength: 50,
        lowercase: true
    },
    name:   StringField,
    hashed_password:    StringField
});


UserSchema.statics.count = function (cb) {
  return this.model('Users').find({}, cb);
}


module.exports = mongoose.model('Users', UserSchema);