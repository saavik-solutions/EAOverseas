import { PrismaClient } from './client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'chief@counsel.com';
  const password = 'CHIEF2026';
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { 
      passwordHash,
      role: 'super_admin',
      isActive: true
    },
    create: {
      email,
      passwordHash,
      fullName: 'Chief Counsel',
      role: 'super_admin',
      isActive: true,
      authProvider: 'email'
    }
  });

  console.log(`User ${email} created/updated with role super_admin and password ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
