// require mongoose
const mongoose = require('mongoose');
// new mongoose schema
const Schema = mongoose.Schema;
// 
const userSchema = new Schema({
	email: { type: String, required:true, unique:true, trim:true},
	password: { type: String, required:true, unique:true, trim:true},
	name: { type: String, required:true, unique:true, trim:true},
	birth: { type: Date, required:true, unique:true, trim:true},
}, {
	timestamps: true,
});

// set 'User' var to the model created
const User = mongoose.model('User', userSchema);
//export that model
module.exports = User;