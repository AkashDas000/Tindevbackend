const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://akashakki1100_db_user:xLTM3mMh312idbgY@namasteakash.zjpaccs.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
