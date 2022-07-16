var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: { type: String, default: Date.now },
    email: { type: String, default: null },
    password: { type: String, default: null },
    name: { type: String, default: null },
    assignedEntity: { type: mongoose.Schema.Types.ObjectId, default: null },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    role: { type: Object, default: "user" },
    userType: { type: Object, default: "Unconfirmed" },
    addedBy: { type: mongoose.Schema.Types.ObjectId, default: null }
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", userSchema);