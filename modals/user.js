const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,      // Corrected 'typeof' to 'type'
        required: true     // Corrected 'require' to 'required'
    },
    email: {
        type: String,
        required: true,
        unique: true       // Ensures the email is unique
    },
    password: {
        type: String,
        required: true
    }
});

const UserModel = mongoose.model("User", UserSchema); // Fixed typo: 'Modal' to 'Model'
module.exports = UserModel;
