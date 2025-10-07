import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./route/foodRoute.js"; // Ensure this path is correct
import userRouter from "./route/userRoute.js";
import 'dotenv/config'
import cartRouter from "./route/cartRoute.js";
import orderRouter from "./route/orderRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
//const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

 //db connection
connectDB();

// api endpoint

app.use("/api/user",userRouter)
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

//request the data from server
app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => 
  console.log(`Server started on http://localhost:${port}`)); // Fix string template issue

