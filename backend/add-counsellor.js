const { PrismaClient, Role } = require('./prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function addCounsellor() {
  const password = await bcrypt.hash('Counsellor@123', 12);
  try {
    const user = await prisma.user.upsert({
      where: { email: 'counsellor@eaoverseas.com' },
      update: {
        role: 'counsellor'
      },
      create: {
        email: 'counsellor@eaoverseas.com',
        passwordHash: password,
        fullName: 'Test Counsellor',
        role: 'counsellor',
        emailVerified: true,
        authProvider: 'email',
      },
    });
    console.log('Counsellor account ready:', user.email);
  } catch (err) {
    console.error(err);
  } finally {
    await prisma.$disconnect();
  }
}

addCounsellor();
