const cart = require('../models/cartModel');
const mongoose = require('mongoose');

const cartController = {

    async addtoCart(req, res) {
        try {
            const loggedInUserId = '65d55284e0548d10d79aa0e1';
            // Find the contact user by username
            const userCart = await cart.findOne({ userId: loggedInUserId });
            if (!userCart) {
                return res.status(404).send('Cart user not found');
            }

            // Add contact to the logged-in user's contact list
            await cart.findOneAndUpdate(
                { userId: loggedInUserId },
                {
                    $addToSet: {
                        items: {
                            "subName": req.body.subName,
                            "price": req.body.price,
                            "quantity": req.body.quantity,
                            "size": req.body.size,
                            "bread": req.body.bread,
                            "cheese": req.body.cheese,
                            "toppings": req.body.toppings,
                            "sauces": req.body.sauces,
                        }
                    },
                },
                { upsert: true }
            );



            res.status(200).send({ message: "inserted successfully" });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async getCartDetails(req, res) {
        try {
            const loggedInUserId = '65d55284e0548d10d79aa0e1';

            const cartDetails = await cart.findOne({ userId: loggedInUserId })
                .populate("items"); // Assuming you want to fetch only usernames
            if (cartDetails && cartDetails.items) {
                // Assuming `price` is the Decimal128 field you want to convert
                const itemsWithConvertedPrice = cartDetails.items.map(item => ({
                    ...item._doc, // Spread the rest of the item properties
                    price: item.price.toString(), // Convert price to string
                }));
                res.json(itemsWithConvertedPrice);
            } else {
                res.json([]);
            }

        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async updateCart(req, res) {
        try {
            const loggedInUserId = '65d55284e0548d10d79aa0e1';
            const { _id, quantity } = req.body;

            // Check if the user's cart exists
            const userCart = await cart.findOne({ userId: loggedInUserId });
            if (!userCart) {
                return res.status(404).send('Cart user not found');
            }

            // Update the quantity of the existing item
            const result = await cart.findOneAndUpdate(
                { userId: loggedInUserId, "items._id": _id },
                { $set: { "items.$.quantity": quantity } }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).send({ message: 'Item not found in cart or cart not found' });
            }

            res.send({ message: 'Item quantity updated successfully' });


        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async deleteCartItem(req, res) {


        try {
            const loggedInUserId = '65d55284e0548d10d79aa0e1';
            const { itemId } = req.query;

            // Convert string to ObjectId

            // Find the cart and remove the item
            const result = await cart.updateOne(
                { userId: loggedInUserId },
                { $pull: { items: { _id: itemId } } }
            );

            if (result.modifiedCount === 0) {
                return res.status(404).send({ message: 'Item not found in cart or cart not found' });
            }

            res.send({ message: 'Item deleted successfully' });
        } catch (error) {
            console.error('Failed to delete item from cart:', error);
            res.status(500).send({ message: 'Internal Server Error' });
        }
    }




}

module.exports = cartController;
