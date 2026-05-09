import { PrismaClient } from './prisma/client';
const prisma = new PrismaClient();

async function check() {
  const posts = await prisma.feedPost.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: { author: true }
  });
  console.log(JSON.stringify(posts, null, 2));
}

check().catch(console.error).finally(() => prisma.$disconnect());
