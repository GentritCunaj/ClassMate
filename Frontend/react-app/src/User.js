const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const ContactModel = mongoose.model("user", UserSchema);
module.exports = ContactModel;
