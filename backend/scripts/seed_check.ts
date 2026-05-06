import { prisma } from '../src/lib/prisma';

async function main() {
  const users = await prisma.user.findMany({
    where: {
      role: { in: ['admin', 'super_admin'] }
    },
    take: 5
  });
  console.log('Admins:', JSON.stringify(users, null, 2));
  
  const unis = await prisma.university.findMany({ take: 5 });
  console.log('Universities:', JSON.stringify(unis, null, 2));
}

main().catch(console.error).finally(() => prisma.$disconnect());
