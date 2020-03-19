const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
    name: { type: String },
  email: { type: String },
   cardnum: { type: Number },
   expiration: { type: String },
   CVV: { type: Number },
}, {
  timestamps: true,
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

module.exports = Purchase;