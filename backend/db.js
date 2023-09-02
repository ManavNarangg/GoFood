const mongoose = require("mongoose");
require("dotenv").config();

const mongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });
    console.log("Connected to database");

    const fetchedData = await mongoose.connection.db.collection("GoFood").find({}).toArray();
    const foodCategory = await mongoose.connection.db.collection("FoodCategory").find({}).toArray();

    global.foodItems = fetchedData;
    global.foodCategory = foodCategory;
  } catch (error) {
    console.error("Connection error:", error);
  }
};

module.exports = mongo;
