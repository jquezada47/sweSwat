const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    price: { type: Number },
  type: { type: String },
   showID: { type: Number },
   userID: { type: String },
   movieID: { type: Number },
   siteID: { type: Number}
}, {
  timestamps: true,
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;