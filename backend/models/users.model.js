// require mongoose
const mongoose = require("mongoose");
// new mongoose schema
const Schema = mongoose.Schema;
//
const userSchema = new Schema(
	{
		email: { type: String },
		password: { type: String },
		name: { type: String },
		birth: { type: Date },
		gender: { type: String },
	},
	{
		timestamps: true,
	}
);

// set 'User' var to the model created
const User = mongoose.model("User", userSchema);
//export that model
module.exports = User;
