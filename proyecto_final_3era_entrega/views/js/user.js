const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const mongooseCache = require("mongoose-cache");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

let cache = {
    maxAge: 600000
}

mongooseCache.install(mongoose, cache);

UserSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('password')) {
        const document = this

        bcrypt.hash(document.password, saltRounds, (err, hashedPassword) => {
            if (err) {
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }
});

UserSchema.methods.isCorrectPassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, same){
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', UserSchema);
