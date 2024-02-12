const mongoose = require('mongoose');
//const bcrypt = require('bcryptjs');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5
    },
    phonenumber: {
        type: String,
        required: true,
        unique: true,
    }
    // You can add more fields here if needed
}, {
    timestamps: true // Automatically create 'createdAt' and 'updatedAt' fields
});


// Create the model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
