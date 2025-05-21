const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function mongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Successfully connected to MongoDB');

    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    const foodCategory = mongoose.connection.db.collection("foodCategory");
    const catData = await foodCategory.find({}).toArray()

    global.food_items = data;
    global.foodCategory = catData;

  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

module.exports=mongoDB;