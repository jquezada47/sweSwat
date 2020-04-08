const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
	price: { type: Number },
	type: { type: String },
	showID: { type: Number },
	userID: { type: String },
	movieTitle: { type: String },
	siteName: { type: String}
}, {
	timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;