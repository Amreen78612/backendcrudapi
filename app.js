const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const bodyParser =require('body-parser')
require('dotenv').config();
const app = express();

// Connect to Database

// Setting the directory where the template files are located
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


// Routers (Assuming these are your router definitions)
const UsersRouter = require('./routers/usersRouter');
const AuthRouter = require('./routers/authRouter');

// Serve static files from public folder
app.use(express.static('public'));

// Use routers
app.use('/api', UsersRouter);
app.use('/api', AuthRouter);


app.get('/', (req, res) => {
  res.send('Welcome to the API'); // Replace with your desired response
});




const PORT = process.env.PORT || 5000;

// Starting a server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
