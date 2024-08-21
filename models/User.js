const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  phoneNumber:{ type:  Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, },
});

module.exports = mongoose.model("User", UserSchema);

