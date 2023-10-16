const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://ermanisha08:9900391329@cluster0.bswolcd.mongodb.net/GoodFoodmern?retryWrites=true&w=majority";
// const mongoDB = () => {
//   mongoose.connect(mongoURI, () => {
//     console.log("connected");
//   });
// };
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Connected");
    const fetched_data = await mongoose.connection.db.collection("food-items");
    const foodCategory = await mongoose.connection.db.collection(
      "food-category"
    );
    //console.log(fetched_data.find({}));
    var foodItems = await fetched_data.find({}).toArray();

    var foodCategories = await foodCategory.find({}).toArray();
    global.foodItems = foodItems;
    global.foodCategory = foodCategories;
    // foodItems.forEach(function (item) {
    //   foodCategories.forEach(function (category) {
    //     global.food_items.push(item);
    //     global.foodCategory.push(category);
    //   });
    // });
  } catch (err) {
    console.log(err);
  }
};
module.exports = mongoDB;
