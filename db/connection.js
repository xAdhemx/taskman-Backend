const mongoose = require("mongoose");


const connectDB = async () => {
    try {
      mongoose.connect(process.env.DBURL, {serverSelectionTimeoutMS: 5000});
      console.log("Database connected !!!")
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  };

  module.exports = connectDB()