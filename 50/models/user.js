const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {  // remember, this is the hashed pw
        type: String,
        required: true,
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const user = await this.findOne({ username });
    const valid = await bcrypt.compare(password, user.password);
    return valid ? user : false;  // full user if found, else false
}

userSchema.pre('save', async function (next) {
    // we only want to rehash if pw has changed!
    if (!this.isModified('password')) return next();

    // "this" points to the specific user calling the fcn
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);