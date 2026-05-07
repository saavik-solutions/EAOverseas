import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables.');
        }

        console.log(`Attempting to connect to MongoDB...`);
        // Mask password in log
        const maskedURI = mongoURI.replace(/:([^@]+)@/, ':****@');
        console.log(`URI: ${maskedURI}`);

        const conn = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000, // 10s timeout
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error: any) {
        console.error(`Error connecting to MongoDB:`, error.message);
        if (error.reason) console.error(`Reason:`, error.reason);
        console.warn("Continuing without database connection...");
    }
};
