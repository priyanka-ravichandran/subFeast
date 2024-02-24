const { Int32, Decimal128, Double } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userCartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Reference to the User model
  },
  items: [
    {
      subName: String,
      price: {
        type: mongoose.Schema.Types.Decimal128,
      },
      quantity: Number,
      size: {
        type: String,
        required: true,
        enum: ['6 inches', 'FootLong'], // Example sizes
      },
      bread: {
        type: String,
        required: true
      },
      cheese: {
        type: String,
        required: true
      },
      toppings: {
        type: Map,
        of: Boolean
      },
      sauces: {
        type: Map,
        of: Boolean
        // Example structure: { lettuce: "Yes", tomato: "No", ... }
        // This allows for a dynamic key-value pair representation of toppings.
      }, // An array of strings to hold the sauces
    }
  ]
}, { collection: 'userCarts' });

// Create the model from the schema and export it
const UserCart = mongoose.model('userCarts', userCartSchema);

module.exports = UserCart;
