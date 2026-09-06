const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo Connected Successfully");
  } catch (error) {
    console.error("Mongo Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;