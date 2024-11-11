import mongoose from "mongoose";

export async function connectDB () {
  try {
    let Connection;
    
    if(Connection?.Connection?.readyState != 1 )
    Connection = await mongoose.connect(process.env.MONGODB_URI);
  console.log("db Con");

  } catch (err) {
    console.log("err", err);
  }
}
