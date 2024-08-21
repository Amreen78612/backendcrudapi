const express = require('express')

const router = express.Router()

const users = require('../controllers/authControllers')

router.post('/login', users.login)

 router.post('/logout', users.signout)


module.exports = router;



