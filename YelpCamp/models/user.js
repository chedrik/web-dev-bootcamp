const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
});

// Don't need to specifcy usertname and pw due to the passport plugin
userSchema.plugin(passportLocalMongoose);  // this is magic! Adds username, hash, salt, addtl fcns, uniqueness

module.exports = mongoose.model('User', userSchema);