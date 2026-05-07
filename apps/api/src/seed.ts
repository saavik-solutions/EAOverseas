import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Post } from './models/Post';
import { Comment } from './models/Comment';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const SEED_USERS = [
    {
        firebaseUid: 'USER_ADMIN_001',
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=145',
        role: 'student',
        trustScore: 85,
    },
    {
        firebaseUid: 'USER_COUNSELLOR_001',
        name: 'Dr. Alex Morgan',
        email: 'partner@counsellor.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=103',
        role: 'counsellor',
        trustScore: 90,
    },
    {
        firebaseUid: 'seed_user_1',
        name: 'Priya_Visa',
        email: 'priya@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=111',
        role: 'student',
        trustScore: 90,
    }
];

const SEED_POSTS = [
    {
        title: "Which is the best university for interior design?",
        content: "Looking for recommendations for top-ranked interior design programs globally — any thoughts?",
        tags: ["Admissions", "Interior Design", "University", "Study Abroad"],
        score: 47,
    },
    {
        title: "Is the GRE waived for Fall 2024 CS programs in Canada?",
        content: "I'm seeing mixed information on university websites. Some say optional, some say required for international students. Has anyone applied recently to UofT or UBC?",
        tags: ["Admissions", "Eligibility", "Canada", "CS"],
        score: 156,
    },
    {
        title: "US F-1 Visa Interview Experience – Mumbai Consulate (Approved! 🎉)",
        content: "Just got my visa approved! Questions asked: 1. Why this university? 2. Who is sponsoring you? 3. What are your plans after graduation? Be confident and honest!",
        tags: ["Visas", "USA"],
        score: 340,
    }
];

async function seed() {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) throw new Error('MONGO_URI not found');

        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB for seeding');

        // Clear existing data
        await User.deleteMany({});
        await Post.deleteMany({});
        await Comment.deleteMany({});

        const createdUsers = await User.insertMany(SEED_USERS);
        console.log(`Created ${createdUsers.length} seed users`);

        for (let i = 0; i < SEED_POSTS.length; i++) {
            const postData = SEED_POSTS[i];
            const author = createdUsers[i % createdUsers.length];

            const post = new Post({
                ...postData,
                authorId: author._id,
            });
            await post.save();
        }

        console.log(`Created ${SEED_POSTS.length} seed posts`);
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

seed();
