declare var process: any;
import { PrismaClient, Role, DegreeType, UniversityType, FeedCategory, PostStatus } from './client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create Super Admin User
  const superAdminPassword = await bcrypt.hash('Admin@123', 12);
  const superadmin = await prisma.user.upsert({
    where: { email: 'superadmin@eaoverseas.com' },
    update: { passwordHash: superAdminPassword },
    create: {
      email: 'superadmin@eaoverseas.com',
      passwordHash: superAdminPassword,
      fullName: 'Super Admin',
      role: Role.super_admin,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Super Admin user created:', superadmin.email);

  // 1.1 Create Legacy Admin User (From frontend demo credentials)
  const legacyAdminPassword = await bcrypt.hash('Admin@123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@eaoverseas.com' },
    update: { passwordHash: legacyAdminPassword },
    create: {
      email: 'admin@eaoverseas.com',
      passwordHash: legacyAdminPassword,
      fullName: 'System Admin',
      role: Role.super_admin,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Admin user created:', admin.email);

  // 1.2 Create Chief Counsel User (Admin role)
  const chiefPassword = await bcrypt.hash('CHIEF2026', 12);
  const chief = await prisma.user.upsert({
    where: { email: 'chief@counsel.com' },
    update: { passwordHash: chiefPassword },
    create: {
      email: 'chief@counsel.com',
      passwordHash: chiefPassword,
      fullName: 'Chief Counsel',
      role: Role.admin,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Chief Counsel created:', chief.email);

  // 1.3 Create Vendor User
  const vendorPassword = await bcrypt.hash('VENDOR2026', 12);
  const vendor = await prisma.user.upsert({
    where: { email: 'vendor@services.com' },
    update: { passwordHash: vendorPassword },
    create: {
      email: 'vendor@services.com',
      passwordHash: vendorPassword,
      fullName: 'Vendor Partner',
      role: Role.vendor,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Vendor user created:', vendor.email);

  // 1.4 Create University User (Vendor role)
  const univPassword = await bcrypt.hash('UNIV2026', 12);
  const universityUser = await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: { passwordHash: univPassword },
    create: {
      email: 'admin@university.edu',
      passwordHash: univPassword,
      fullName: 'University Admin',
      role: Role.vendor,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('University user created:', universityUser.email);

  // 1.5 Create Counsellor User
  const counsellorPassword = await bcrypt.hash('COUNSELLOR2026', 12);
  const counsellor = await prisma.user.upsert({
    where: { email: 'partner@counsellor.com' },
    update: { passwordHash: counsellorPassword },
    create: {
      email: 'partner@counsellor.com',
      passwordHash: counsellorPassword,
      fullName: 'Expert Counsellor',
      role: Role.counsellor,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Counsellor user created:', counsellor.email);

  // 1.6 Create Demo Student User
  const demoStudentPassword = await bcrypt.hash('5678', 12);
  const demoStudent = await prisma.user.upsert({
    where: { email: 'alex.j@example.com' },
    update: { passwordHash: demoStudentPassword },
    create: {
      email: 'alex.j@example.com',
      passwordHash: demoStudentPassword,
      fullName: 'Alex J',
      role: Role.student,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Demo Student created:', demoStudent.email);

  // 1.7 Create Prasenjeet Student User
  const studentPassword = await bcrypt.hash('Student@123', 12);
  const student = await prisma.user.upsert({
    where: { email: 'prasenjeetspy@gmail.com' },
    update: { passwordHash: studentPassword },
    create: {
      email: 'prasenjeetspy@gmail.com',
      passwordHash: studentPassword,
      fullName: 'Prasenjeet',
      role: Role.student,
      emailVerified: true,
      authProvider: 'email',
    },
  });
  console.log('Student user created:', student.email);

  // 2. Create Universities
  const tum = await prisma.university.upsert({
    where: { slug: 'tum-munich' },
    update: {},
    create: {
      name: 'Technical University of Munich',
      slug: 'tum-munich',
      country: 'Germany',
      city: 'Munich',
      type: UniversityType.public,
      qsRanking: 37,
      websiteUrl: 'https://www.tum.de/en/',
      description: 'The Technical University of Munich is a public research university in Munich, Germany.',
      acceptanceRate: 8,
      isActive: true,
    },
  });

  const oxford = await prisma.university.upsert({
    where: { slug: 'university-of-oxford' },
    update: {},
    create: {
      name: 'University of Oxford',
      slug: 'university-of-oxford',
      country: 'United Kingdom',
      city: 'Oxford',
      type: UniversityType.public,
      qsRanking: 3,
      websiteUrl: 'https://www.ox.ac.uk/',
      description: 'The University of Oxford is a collegiate research university in Oxford, England.',
      acceptanceRate: 17,
      isActive: true,
    },
  });

  console.log('Universities created');

  // 3. Create Courses
  await prisma.universityCourse.upsert({
    where: { slug: 'tum-munich-ms-cs' },
    update: {},
    create: {
      universityId: tum.id,
      name: 'M.Sc. in Informatics (Computer Science)',
      slug: 'tum-munich-ms-cs',
      degreeType: DegreeType.masters,
      field: 'Computer Science',
      durationYears: 2,
      language: 'English',
      intakeMonths: [10],
      requirements: {
        create: {
          minGpa: 3.0,
          avgGpa: 3.5,
          minIelts: 6.5,
          sopRequired: true,
        },
      },
      fees: {
        create: {
          tuitionPerYearUsd: 0,
          avgLivingPerYearUsd: 12000,
          applicationFeeUsd: 50,
        },
      },
    },
  });

  await prisma.universityCourse.upsert({
    where: { slug: 'oxford-ms-advanced-cs' },
    update: {},
    create: {
      universityId: oxford.id,
      name: 'MSc in Advanced Computer Science',
      slug: 'oxford-ms-advanced-cs',
      degreeType: DegreeType.masters,
      field: 'Computer Science',
      durationYears: 1,
      language: 'English',
      intakeMonths: [10],
      requirements: {
        create: {
          minGpa: 3.7,
          avgGpa: 3.9,
          minIelts: 7.5,
          sopRequired: true,
          lorCount: 3,
        },
      },
      fees: {
        create: {
          tuitionPerYearUsd: 45000,
          avgLivingPerYearUsd: 20000,
          applicationFeeUsd: 100,
        },
      },
    },
  });

  console.log('Courses created');

  // 4. Create Sample Feed Post
  await prisma.feedPost.upsert({
    where: { slug: 'welcome-to-ea-overseas' },
    update: {},
    create: {
      authorId: admin.id,
      title: 'Welcome to EA Overseas!',
      slug: 'welcome-to-ea-overseas',
      content: 'Your journey to studying abroad starts here. Explore universities, build your profile, and get AI-powered feedback.',
      category: FeedCategory.news,
      status: PostStatus.published,
      publishedAt: new Date(),
    },
  });

  console.log('Feed post created');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
