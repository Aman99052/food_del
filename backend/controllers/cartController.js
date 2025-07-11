import userModel from "../models/userModel.js";

//add item to user cart
const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({_id:req.body.userId});
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;  //add the value to the cart
    } else {
      cartData[req.body.itemId] += 1; //increase the cart value
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Adddes To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove items from user cart
const removeFromCart = async (req, res) => {
  try{
    let userData =await userModel.findById(req.body.userId);
    let cartData =await userData.cartData;
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId]-=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Removed From Cart"})
  } catch(error){
     console.log(error);
     res.json({success:false,message:"Error"})
  }
}

//fetch user cart data
const getCart = async (req, res) => {
  try{
    let userData=await userModel.findById(req.body.userId);
    let cartData=await userData.cartData;
    res.json({success:true,cartData:cartData});
  } catch(error){
     console.log(error);
     res.json({success:false,message:"Error"})
  }
};

/*const getCart =async (req, res) => {
  console.log('Incoming cart data:', req.body.cartData);
  
  const cartData = req.body.cartData;
  if (!cartData) {
      return res.status(400).json({ message: "Cart data is missing or invalid" });
  }
  
  // Proceed with your logic if cartData is not null
  // ...
};*/


export { addToCart, removeFromCart, getCart };
