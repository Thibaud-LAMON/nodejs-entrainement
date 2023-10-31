const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, //unique permet de garantir qu'on utilisera un mail une seule et unique fois
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator); // on est sur qu'une adresse ne pourra être utilisée deux fois

module.exports = mongoose.model("User", userSchema);
