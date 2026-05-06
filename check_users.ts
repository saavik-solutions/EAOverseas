import { PrismaClient } from './backend/prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.user.findMany({ select: { fullName: true, email: true, role: true, isActive: true } });
  console.log(JSON.stringify(users, null, 2));
}
main().finally(() => prisma.$disconnect());
