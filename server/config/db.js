const mongoose = require("mongoose");

const uri =
  "mongodb+srv://cookbookuser:2qXnNqSvlj53RXss@cookbookcluster.yokau85.mongodb.net/cookbook?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected with mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
