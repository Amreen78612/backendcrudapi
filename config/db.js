const mongoose = require('mongoose');



const url = "mongodb://0.0.0.0:27017/taskdatabase";



mongoose.connect(url, { useNewUrlParser: true });



const connectDB = mongoose.connection;

connectDB.on("open", () => {
  console.log("Connected...");
})

