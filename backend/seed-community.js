const { PrismaClient } = require('./prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('Seeding Community and Global Feeds...');

    const admin = await prisma.user.findFirst({ where: { role: 'super_admin' } });
    if (!admin) {
        console.error('No admin found, please run standard seed first.');
        process.exit(1);
    }

    // Adding Global Feed Posts
    await prisma.feedPost.createMany({
        data: [
            {
                authorId: admin.id,
                title: 'Top 10 Scholarships for Fall 2025',
                slug: 'top-10-scholarships-fall-2025-' + Date.now(),
                content: 'Check out the top fully-funded scholarships available for international students applying this fall.',
                category: 'scholarships',
                status: 'published',
                publishedAt: new Date()
            },
            {
                authorId: admin.id,
                title: 'Visa Interview Preparation Guide',
                slug: 'visa-interview-prep-guide-' + Date.now(),
                content: 'A comprehensive guide on how to tackle the 5 most common visa interview questions with confidence.',
                category: 'visa',
                status: 'published',
                publishedAt: new Date()
            }
        ],
        skipDuplicates: true,
    });

    // Adding Community Feed Posts
    const post1 = await prisma.communityPost.create({
        data: {
            authorId: admin.id,
            title: 'Is TU Munich hard to get into for CS?',
            content: 'I have a 3.5 GPA and I am wondering if TUM MS CS is fully realistic or if I should focus on other public universities?',
            category: 'admissions',
            tags: ['germany', 'cs', 'tum'],
            isQuestion: true,
        }
    });

    const post2 = await prisma.communityPost.create({
        data: {
            authorId: admin.id,
            title: 'What to pack for Winter in Canada?',
            content: 'I am moving to Toronto next month. Should I buy my winter jacket locally or buy it when I get there?',
            category: 'accommodation',
            tags: ['canada', 'packing'],
            isQuestion: true,
        }
    });

    // Adding comments
    await prisma.communityComment.create({
        data: {
            postId: post1.id,
            authorId: admin.id,
            text: 'It is highly competitive, but a 3.5 is a solid starting point. Make sure your SOP is well crafted!',
            isAnswer: true,
        }
    });

    await prisma.communityComment.create({
        data: {
            postId: post2.id,
            authorId: admin.id,
            text: 'Definitely buy your heavy winter gear in Canada! The jackets sold there are rated for -20C.',
            isAnswer: false,
        }
    });

    console.log('Seeding complete! Added community + global feed items.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
