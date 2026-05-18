
import { PrismaClient } from './prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Database Verification ---');
  
  try {
    const userCount = await prisma.user.count();
    console.log(`Total Users: ${userCount}`);

    const activeUniversities = await prisma.university.findMany({
      where: { isActive: true },
      select: { name: true, country: true },
      take: 5
    });

    console.log('\n--- Active Universities (First 5) ---');
    if (activeUniversities.length === 0) {
      console.log('No active universities found.');
    } else {
      activeUniversities.forEach(u => {
        console.log(`- ${u.name} (${u.country})`);
      });
    }

    const applicationCount = await prisma.application.count();
    console.log(`\nTotal Student Applications: ${applicationCount}`);

    const roles = await prisma.user.groupBy({
      by: ['role'],
      _count: true
    });
    
    console.log('\n--- User Roles Breakdown ---');
    roles.forEach(r => {
      console.log(`- ${r.role}: ${r._count}`);
    });

  } catch (error) {
    console.error('Failed to connect to database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
