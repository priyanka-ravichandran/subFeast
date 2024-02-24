

// Define the user schema
const { Decimal128, Double } = require('mongodb');
const mongoose = require('mongoose');

const subSchema = new mongoose.Schema({
  sub_name: String,
  image: String,
  description: String,
  price: mongoose.Schema.Types.Decimal128,
}, { collection: 'subs' }); // Explicitly specifying the collection name

const Sub = mongoose.model('subs', subSchema);

module.exports = Sub;
  

