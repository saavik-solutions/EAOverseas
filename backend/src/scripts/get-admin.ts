import { PrismaClient } from '../../prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const admin = await prisma.user.findFirst({
      where: {
        role: { in: ['admin', 'super_admin'] }
      }
    });
    if (!admin) {
        // Fallback: search for any user if no admin found
        const anyUser = await prisma.user.findFirst();
        console.log('ANY_USER:', JSON.stringify(anyUser));
    } else {
        console.log('ADMIN_USER:', JSON.stringify(admin));
    }
  } catch (err) {
    console.error('Prisma Error:', err);
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
