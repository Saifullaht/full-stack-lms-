// lib/DbConnect.js
import mongoose from "mongoose";  
import { UserModal } from "@/lib/modals/UserModal";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/DbConect";
 
   

export async function POST(request) {
  // Connect to the database
  await connectDB();

  // Parse the request body
  const obj = await request.json();
  console.log(" login obj", obj);  // Log request body to inspect the input
  const user = await UserModal.findOne({email: obj.email})
if(!user) return Response.json({error: true , msg: "User Not Found "} , {
  status: 400,
});
 const ispasswordmatch = await bcrypt.compareSync(obj.password, user.password); 
 if(!ispasswordmatch) return Response.json({error: true , msg: "password is not valid"} , {
  status: 400,
});
const token = jwt.sign({ id: user._id, role: user.role },process.env.JWT_KEY,  // Make sure JWT_KEY is in your .env file
  
);
return new Response(
  JSON.stringify({
    error: false,
    msg: "User Login Successfully",
    user,
    token,
  }),
  { status: 202 }
);
 console.log(ispasswordmatch);
 
return Response.json("user login")
}