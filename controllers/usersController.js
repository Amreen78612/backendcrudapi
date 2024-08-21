const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const secretkey = process.env.SESSION_SECRET || "technogazwersecret";

// Create a new user
exports.create = async (req, res) => {
    try {
        const { name, lastname, phoneNumber, email, password } = req.body;

        // Check if the email already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "The email address you entered is already associated with an account. Please use a different email or log in with your existing account.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = new User({
            name,
            lastname,
            phoneNumber,
            email,
            password: hashedPassword,
        });

       const users= await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User Created Successfully",
            users: users,
        });
    } catch (error) {
        console.error('Error while creating user:', error);
        return res.status(500).json({
            success: false,
            message: "Error while creating user",
            error: error.message,
        });
    }
};

// Find a user by ID
exports.findOne = async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID",
        });
    }

    try {
        const users = await User.findById(userId);

        if (!users) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            users,
        });
    } catch (error) {
        console.error('Error while fetching user:', error);
        return res.status(500).json({
            success: false,
            message: "Error while fetching user",
            error: error.message,
        });
    }
};

// Find all users
exports.findAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved all users",
            users,
        });
    } catch (error) {
        console.error('Error while retrieving users:', error);
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve users",
            error: error.message,
        });
    }
};

// Update a user
exports.update = async (req, res) => {
    const userId = req.params.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid ID",
        });
    }

    try {
        const { name, lastname, phoneNumber, email } = req.body;

        const existingUser = await User.findOne({
            email,
            _id: { $ne: userId },
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "The email address you entered is already associated with an account. Please use a different email or log in with your existing account.",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, lastname, phoneNumber, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error while updating user:', error);
        return res.status(500).json({
            success: false,
            message: "Error while updating user",
            error: error.message,
        });
    }
};

// Delete a user
exports.delete = async (req, res) => {
  const userId = req.params.userId;
  
  if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
          success: false,
          message: "Invalid ID",
      });
  }

  try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
          return res.status(404).json({
              success: false,
              message: "User not found",
          });
      }

      return res.status(200).json({
          success: true,
          message: "User deleted successfully",
          user: deletedUser,
      });
  } catch (error) {
      console.error('Error while deleting user:', error);
      return res.status(500).json({
          success: false,
          message: "Error while deleting user",
          error: error.message,
      });
  }
};

