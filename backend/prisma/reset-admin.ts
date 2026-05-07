import { PrismaClient } from './client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@eaoverseas.com';
  const newPassword = 'Admin@123';
  const passwordHash = await bcrypt.hash(newPassword, 10);

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { 
      passwordHash,
      isActive: true,
      role: 'super_admin'
    }
  });

  console.log(`Password for ${email} has been reset to ${newPassword}`);
  console.log('User status:', updatedUser.isActive ? 'Active' : 'Inactive');
  console.log('User role:', updatedUser.role);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
