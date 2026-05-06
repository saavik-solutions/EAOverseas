import { PrismaClient } from '../prisma/client';

const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.feedPost.deleteMany({
    where: {
      status: {
        in: ['pending', 'rejected']
      }
    }
  });
  console.log(`Successfully deleted ${deleted.count} posts with status 'pending' or 'rejected'.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
