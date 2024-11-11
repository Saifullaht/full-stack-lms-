// lib/DbConnect.js
import mongoose from "mongoose";  
import { UserModal } from "@/lib/modals/UserModal";  
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/DbConect";
   

export async function POST(request) {
  // Connect to the database
  await connectDB ();

  // Parse the request body
  const obj = await request.json();
  console.log("obj", obj);  // Log request body to inspect the input

  // Check if the user already exists
  const user = await UserModal.findOne({ email: obj.email });
  if (user) {
    return new Response(
      JSON.stringify({ error: true, msg: "User Already Exists" }),
      { status: 403 }
    );
  }

  // Hash the password before saving
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
  obj.password = hashedPassword;

  // Create and save a new user
  let newUser = new UserModal({ ...obj });
  newUser = await newUser.save();

  // Generate JWT token
  const token = jwt.sign({ id: newUser._id, role: newUser.role },process.env.JWT_KEY,  // Make sure JWT_KEY is in your .env file
  
  );

  console.log("newUser", newUser);  // Log the newly created user object

  // Return response with user and token
  return new Response(
    JSON.stringify({
      error: false,
      msg: "User Added Successfully",
      user: newUser,
      token,
    }),
    { status: 201 }
  );
}

export async function GET() {
  return new Response(JSON.stringify("User Get Request"), { status: 200 });
}
