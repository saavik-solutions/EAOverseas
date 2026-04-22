import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function check() {
  const interactions = await prisma.feedInteraction.findMany({
    take: 10,
    orderBy: { createdAt: 'desc' }
  });
  console.log('Recent Interactions:', JSON.stringify(interactions, null, 2));

  const posts = await prisma.feedPost.findMany({
    where: {
      OR: [
        { likeCount: { gt: 0 } },
        { dislikeCount: { gt: 0 } }
      ]
    },
    select: { id: true, title: true, likeCount: true, dislikeCount: true }
  });
  console.log('Posts with counts:', JSON.stringify(posts, null, 2));
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
