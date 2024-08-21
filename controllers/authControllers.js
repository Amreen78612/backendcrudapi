const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretkey = "token"; // Use environment variables in production

// Login Controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email"
            });
        }

        // Compare password
        const isSame = await bcrypt.compare(password, user.password);
        if (!isSame) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secretkey, { expiresIn: "24h" });

        // Exclude sensitive data from response
        const { password: pwd, ...userData } = user.toObject();

        return res.status(200).json({
            user: userData,
            token,
            success: true,
            message: "Login Successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Authorization error"
        });
    }
};

// Signout Controller
exports.signout = (req, res) => {
    res.cookie("token", '', { expires: new Date(0) });
    req.session.destroy((err) => {
        if (err) {
            console.error('Failed to destroy session:', err);
            return res.status(500).json({ success: false, message: 'Failed to logout' });
        }
        res.clearCookie('token');
        res.status(200).json({ success: true, message: 'Logout successful' });
    });
};


