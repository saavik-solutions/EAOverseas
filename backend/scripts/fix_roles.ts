import { PrismaClient, Role } from '../prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Starting role migration...');

  try {
    // 1. Set admin role
    const adminRes = await prisma.user.updateMany({
      where: { email: 'admin@eaoverseas.com' },
      data: { role: Role.super_admin },
    });
    console.log(`✅ Admin updated: ${adminRes.count} user(s)`);

    // 2. Set everyone else to student
    const studentRes = await prisma.user.updateMany({
      where: { 
        email: { not: 'admin@eaoverseas.com' } 
      },
      data: { role: Role.student },
    });
    console.log(`✅ Students updated: ${studentRes.count} user(s)`);

  } catch (error) {
    console.error('❌ Error during role migration:', error);
  } finally {
    await prisma.$disconnect();
    console.log('🏁 Migration finished');
  }
}

main();
