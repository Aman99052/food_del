import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://amankumarrrr999:reflection999@cluster0.ebsizda.mongodb.net/food-del', {
      useNewUrlParser: true,
     // useCreateIndex: true,
      useUnifiedTopology: true,
     // useFindAndModify: false,
    });
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1); // Exit process with failure
  }
};

//mongodb+srv://amankumarrrr999:<db_password>@cluster0.ebsizda.mongodb.net/