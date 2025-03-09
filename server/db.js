import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const connectionDB = await mongoose.connect(process.env.MONGO_URI || process.env.COMPASS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, 
    });
    
    isConnected = true;
    console.log(`MongoDB connected: ${connectionDB.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

export default connectDB;