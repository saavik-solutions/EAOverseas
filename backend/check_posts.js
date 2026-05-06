const { PrismaClient } = require('./prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.feedPost.findMany({
    select: {
      id: true,
      title: true,
      status: true
    }
  });
  console.log(JSON.stringify(posts, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
