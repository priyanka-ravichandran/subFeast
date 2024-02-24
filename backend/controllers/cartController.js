const cart = require('../models/cartModel');

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
                    price: item.price.$numberDecimal.toString(), // Convert price to string
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
            const { subName, quantity } = req.body;

            // Check if the user's cart exists
            const userCart = await cart.findOne({ userId: loggedInUserId });
            if (!userCart) {
                return res.status(404).send('Cart user not found');
            }

            // Check if the item already exists in the cart
            const itemExists = userCart.items.find(item => item.subName === subName);

            if (itemExists) {
                // Update the quantity of the existing item
                await cart.findOneAndUpdate(
                    { userId: loggedInUserId, "items.subName": subName },
                    { $set: { "items.$.quantity": quantity } }
                );
            } else {
                res.status(500).send({ message: "Item does not exist " })
            }

            res.status(200).send({ message: "Cart updated successfully" });
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    async deleteCartItem(req, res) {
        try {
            const loggedInUserId = '65d55284e0548d10d79aa0e1';
            const { itemId } = req.body; // Assuming itemId is passed as a URL parameter

            // Check if the user's cart exists
            const userCart = await cart.findOne({ userId: loggedInUserId });
            if (!userCart) {
                return res.status(404).send('Cart user not found');
            }

            // Check if the item exists in the cart
            const itemIndex = userCart.items.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                // Item found, remove it from the array
                await cart.findOneAndUpdate(
                    { userId: loggedInUserId },
                    { $pull: { items: { id: itemId } } } // Use $pull to remove the item by itemId
                );
                res.status(200).send({ message: "Item deleted successfully" });
            } else {
                // Item not found in the cart
                res.status(404).send({ message: "Item not found in cart" });
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }




}

module.exports = cartController;
