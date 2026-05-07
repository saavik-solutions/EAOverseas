import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      console.warn('MONGODB_URI is not defined. Skipping MongoDB connection.');
      return;
    }

    console.log('Attempting to connect to MongoDB (Hybrid Backend)...');
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    console.error(`Error connecting to MongoDB:`, error.message);
    console.warn('Continuing without MongoDB connection...');
  }
};
