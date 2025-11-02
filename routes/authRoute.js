const mongoose = require('mongoose');
const User = require('../models/userModel');
const router = require('./taskRoute');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');

router.get('/', (req, res) => {
    res.send('Auth Route is working');
}
);


router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return  res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const jwtToken = jwtToken.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', user : user, token: token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});
module.exports = router;