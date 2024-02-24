const User = require('../models/userModel');
const tf = require('textflow.js');
//const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

tf.useKey('fDGVyo4RGUFb4rOWVbkp3C8zZBBVf9Amnp2hq8hQ94gvH9ASIHFaqcieY1SxL91r');
const authController = {
    // Signup handler
    async signup(req, res) {

        try {
            const { email, phonenumber } = req.body;
            // Check if the user already exists
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create a new user
            user = new User({ email, phonenumber });
            await user.save();
            
            // Create token
            //const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


            res.status(201).json({
                message: 'User created successfully',
                token,
            });
        } catch (error) {

            res.status(500).json({ error });
        }
    },
    async generateotp(req, res) {
        console.log("in");
        try {
            const { phonenumber } = req.body;
            var result = await tf.sendVerificationSMS(phonenumber);
            // Check if the user already exists
            // Create a new user
            if (result.ok) {
                return res.status(200).json({ success });
            }
            else {
                return res.status(400).json({ result });
            }

        } catch (error) {

            res.status(500).json({ error });
        }
    },



    async verifyOtp(req, res) {
        try {
            const { phonenumber, otp } = req.body;
            let result = await textflow.verifyCode(phonenumber, otp);
            if (result.ok) {
                const user = await User.findOne({ phonenumber });
                if (!user) {
                    return res.status(400).json({ message: 'User not found' });
                }

                // Create token
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                res.json({
                    message: 'Login successful',
                    token,
                });
            }
            else {
                return res.status(400).json({ message: 'Incorrect OTP' });
            }
        } catch (error) {
            console.error("Error occurred: ", error);
            res.status(500).json({ message: 'Server error', error: error.message })
        }
    }
};

module.exports = authController;
