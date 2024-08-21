const express = require('express');
const router = express.Router();

/* const {uploadImage} = require('../middlware/upload');
 */
const users = require('../controllers/usersController');

const { checkAuth, getLoggedInUser } = require('../middlware/userAuth');

// Create a new user
router.post('/users',/*  checkAuth, getLoggedInUser, */ users.create);

// Retrieve all users
router.get('/users', /* checkAuth, getLoggedInUser, */ users.findAll);

// Retrieve a single user with userId
router.get('/users/:userId', /* checkAuth, getLoggedInUser, */ users.findOne);

// Update a user with userId
router.patch('/users/:userId',/*  checkAuth, getLoggedInUser, */  users.update);

// Delete a user with userId
router.delete('/users/:userId',/*  checkAuth, getLoggedInUser, */ users.delete);

module.exports = router;
