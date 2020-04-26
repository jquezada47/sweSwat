const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ticketSchema = new Schema(
	{
		price: { type: Number },
		type: { type: String },
		start: { type: String },
		end: { type: String },
		day: { type: String },
		theater: { type: String },
		title: { type: String },
		email: { type: String },
	},
	{
		timestamps: true,
	}
);

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
