 // Import mongoose

 import mongoose from "mongoose";
 import dotenv from "dotenv";
 
 dotenv.config();
 
 const uri = process.env.MONGO_URI || "mongodb+srv://codewithansari:codewithansari@merrige.unitf.mongodb.net/client";
 
 if (!uri) {
   throw new Error('MONGO_URI environment variable must be set');
 }
 
 const connectDB = async () => {
   try {
     const response = await mongoose.connect(uri);
     console.log(`MongoDB connected: ${response.connection.host}`);
   } catch (err) {
     console.error(`MongoDB connection error: ${err.message}`);
     process.exit(1);
   }
 };
 
 export default connectDB;
 