const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/task", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect to MongoDB success");
  } catch (e) {
    console.error(e.message);
    //Exit Process
    process.exit();
  }
};

module.exports = connectDB;
