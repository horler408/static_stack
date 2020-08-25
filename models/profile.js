const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const profileSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  image: { type: String, required: true },
});

profileSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Profile", profileSchema);
