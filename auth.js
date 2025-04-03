const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Master Password Verification
router.post('/verify-master', (req, res) => {
    const { password } = req.body;

    if (password === process.env.MASTER_PASSWORD) {
        return res.json({ message: 'Master password verified' });
    } else {
        return res.status(401).json({ message: 'Incorrect password' });
    }
});

// Add New User
router.post('/add-user', async (req, res) => {
    const { name, password, phoneNumber } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            password: hashedPassword,
            phoneNumber
        });

        await newUser.save();

        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding user. Please try again.' });
    }
});

// Verify User Password
router.post('/verify-user', async (req, res) => {
    const { name, password } = req.body;

    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            res.json({ message: 'Password verified, access granted' });
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error verifying user. Please try again.' });
    }
});

// Add User Details (phone number, gender, address)
router.post('/add-user-details', async (req, res) => {
    const { name, phoneNumber, gender, address } = req.body;

    try {
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.phoneNumber = phoneNumber;
        user.gender = gender;
        user.address = address;

        await user.save();

        res.json({ message: 'User details added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user details. Please try again.' });
    }
});

module.exports = router;
