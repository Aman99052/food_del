import express from "express";
import { addFood ,listFood,removeFood} from "../controllers/foodController.js"; // Ensure this path is correct
import multer from "multer";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
   return cb(null, `${Date.now()}${file.originalname}`); // Fix string template issue
  }
})

const upload = multer({ storage: storage })

// Example route
foodRouter.get("/list", listFood);
foodRouter.post("/add", upload.single('image'), addFood);
foodRouter.post("/remove", removeFood);


export default foodRouter;
