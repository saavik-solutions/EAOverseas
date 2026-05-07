import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env from apps/api if it exists, otherwise assume MONGO_URI is in process.env
dotenv.config({ path: path.join(__dirname, 'apps/api/.env') });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/community';

async function checkDB() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const Post = mongoose.model('Post', new mongoose.Schema({}, { strict: false }));
        const User = mongoose.model('User', new mongoose.Schema({}, { strict: false }));

        const postCount = await Post.countDocuments();
        const userCount = await User.countDocuments();

        console.log(`Posts: ${postCount}`);
        console.log(`Users: ${userCount}`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

checkDB();
