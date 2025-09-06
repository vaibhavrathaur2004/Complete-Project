const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true, // ❌ Fix 1: "require" ➤ "required"
    },
    email: {
        type: String,
        required: true, // ❌ Fix 2: same typo
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
