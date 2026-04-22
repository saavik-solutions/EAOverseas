import { PrismaClient, Role, DegreeType, UniversityType, FeedCategory, PostStatus } from '../../prisma/client';

const prisma = new PrismaClient();

const ADMIN_ID = '2d6028e8-5be3-4b49-a32f-a2e34ed490f3';

async function main() {
  console.log('🚀 Populating Feed with rich global data...');

  // 1. Universities
  const universities = [
    {
      name: 'Stanford University',
      slug: 'stanford-university',
      country: 'USA',
      city: 'Stanford',
      type: UniversityType.private,
      qsRanking: 5,
      websiteUrl: 'https://www.stanford.edu/',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/1200px-Stanford_University_seal_2003.svg.png',
      bannerUrl: 'https://images.unsplash.com/photo-1533664488202-6af66d26c44a?q=80&w=2000&auto=format&fit=crop',
      description: 'Stanford University is one of the world\'s leading research and teaching institutions.',
      acceptanceRate: 4,
    },
    {
      name: 'University of Toronto',
      slug: 'university-of-toronto',
      country: 'Canada',
      city: 'Toronto',
      type: UniversityType.public,
      qsRanking: 21,
      websiteUrl: 'https://www.utoronto.ca/',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utoronto_logo.svg/1200px-Utoronto_logo.svg.png',
      bannerUrl: 'https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=2000&auto=format&fit=crop',
      description: 'The University of Toronto is a public research university in Toronto, Ontario, Canada.',
      acceptanceRate: 43,
    },
    {
        name: 'University of Melbourne',
        slug: 'university-of-melbourne',
        country: 'Australia',
        city: 'Melbourne',
        type: UniversityType.public,
        qsRanking: 14,
        websiteUrl: 'https://www.unimelb.edu.au/',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/The_University_of_Melbourne_logo.svg/1200px-The_University_of_Melbourne_logo.svg.png',
        bannerUrl: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000&auto=format&fit=crop',
        description: 'The University of Melbourne is a public research university located in Melbourne, Australia.',
        acceptanceRate: 70,
    }
  ];

  for (const uni of universities) {
    await prisma.university.upsert({
      where: { slug: uni.slug },
      update: uni,
      create: uni,
    });
  }
  console.log('✅ Universities synced');

  const stanford = await prisma.university.findUnique({ where: { slug: 'stanford-university' } });
  const utoronto = await prisma.university.findUnique({ where: { slug: 'university-of-toronto' } });
  const melbourne = await prisma.university.findUnique({ where: { slug: 'university-of-melbourne' } });
  const tum = await prisma.university.findUnique({ where: { slug: 'tum-munich' } });
  const oxford = await prisma.university.findUnique({ where: { slug: 'university-of-oxford' } });

  // 2. Feed Posts
  const posts = [
    {
      title: 'Knight-Hennessy Scholars at Stanford University',
      slug: 'knight-hennessy-scholars-stanford-2025',
      content: 'The Knight-Hennessy Scholars program is a multidisciplinary community of graduate students from across Stanford University. It provides full funding for any graduate degree at Stanford.',
      category: FeedCategory.scholarships,
      universityId: stanford?.id,
      coverImageUrl: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2000&auto=format&fit=crop',
      tags: ['#FullyFunded', '#USA', '#Postgrad'],
      metadata: {
        tuitionFee: 'Fully Funded (100%)',
        programDuration: 'Degree Length',
        deadline: 'Oct 09, 2025',
        eligibility: ['Bachelor completed by Jan 2025', 'Admited to Stanford Degree', 'Leadership Potential'],
        benefits: [{ icon: 'flight', title: 'Travel', desc: 'Annual return flight to home country' }, { icon: 'home', title: 'Stipend', desc: 'Living and academic expenses covered' }]
      }
    },
    {
      title: 'DAAD Scholarship for Masters in Germany',
      slug: 'daad-masters-germany-2025',
      content: 'The DAAD scholarship offers foreign graduates from all disciplines and at least two years\' professional experience the chance to take a postgraduate or Master\'s degree at a state or state-recognized German university.',
      category: FeedCategory.scholarships,
      universityId: tum?.id,
      coverImageUrl: 'https://images.unsplash.com/photo-1467226319447-65b418ad56e6?q=80&w=2000&auto=format&fit=crop',
      tags: ['#Germany', '#Europe', '#Masters'],
      metadata: {
        tuitionFee: 'Free (Public Universities)',
        programDuration: '12-24 Months',
        deadline: 'Sep 30, 2025',
        eligibility: ['2 Years Work Experience', 'Degree in relevant field', 'English/German proficiency'],
        benefits: [{ icon: 'money', title: 'Monthly Stipend', desc: '€934 per month' }, { icon: 'health_and_safety', title: 'Insurance', desc: 'Health and accident insurance covered' }]
      }
    },
    {
      title: 'Post-Graduation Work Permit (PGWP) Canada Updates',
      slug: 'pgwp-canada-updates-2025',
      content: 'Important updates regarding the Post-Graduation Work Permit program in Canada. Learn about new eligibility requirements and application timelines for 2025 graduates.',
      category: FeedCategory.visa,
      universityId: utoronto?.id,
      coverImageUrl: 'https://images.unsplash.com/photo-1555617766-c94804975da3?q=80&w=2000&auto=format&fit=crop',
      tags: ['#Canada', '#Visa', '#WorkPermit'],
      metadata: {
        tuitionFee: 'N/A',
        programDuration: 'Up to 3 Years',
        deadline: 'Ongoing',
        eligibility: ['Completed full-time program', 'Min. 8 months duration', 'Standard status maintained'],
        benefits: [{ icon: 'work', title: 'Open Work Permit', desc: 'Work for any employer in Canada' }, { icon: 'trending_up', title: 'PR Pathway', desc: 'Gain Canadian work experience for PR' }]
      }
    },
    {
        title: 'Clarendon Fund Scholarships at University of Oxford',
        slug: 'clarendon-oxford-scholarships-2025',
        content: 'The Clarendon Fund offers around 160 new, fully-funded scholarships each year to outstanding graduate students from around the world at the University of Oxford.',
        category: FeedCategory.scholarships,
        universityId: oxford?.id,
        coverImageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=2000&auto=format&fit=crop',
        tags: ['#Oxford', '#UK', '#FullyFunded'],
        metadata: {
          tuitionFee: 'Fully Funded',
          programDuration: 'Duration of Course',
          deadline: 'Jan 2025',
          eligibility: ['Exceptional academic merit', 'Potential to contribute to field'],
          benefits: [{ icon: 'payments', title: 'Full Tuition', desc: 'Complete course fees covered' }, { icon: 'account_balance_wallet', title: 'Living Grant', desc: 'At least £18,622 annual grant' }]
        }
      },
      {
        title: 'University of Melbourne Research Scholarships',
        slug: 'melbourne-research-scholarship-2025',
        content: 'The Graduate Research Scholarship is awarded to high-achieving students undertaking graduate research at the University of Melbourne.',
        category: FeedCategory.scholarships,
        universityId: melbourne?.id,
        coverImageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2000&auto=format&fit=crop',
        tags: ['#Australia', '#PhD', '#Research'],
        metadata: {
          tuitionFee: 'Full Fee Offset',
          programDuration: '3.5 - 4 Years',
          deadline: 'Oct 31, 2025',
          eligibility: ['Applying for Masters by Research or PhD', 'Excellent academic records'],
          benefits: [{ icon: 'savings', title: 'Living Allowance', desc: '$37,000 per year' }, { icon: 'hotel', title: 'Relocation Grant', desc: '$3,000 for overseas students' }]
        }
      }
  ];

  for (const post of posts) {
    const { title, slug, content, category, universityId, coverImageUrl, tags, metadata } = post;
    await prisma.feedPost.upsert({
      where: { slug },
      update: {
        title,
        content,
        category: category as any,
        universityId,
        coverImageUrl,
        tags,
        metadata,
        status: PostStatus.published,
        publishedAt: new Date(),
      },
      create: {
        authorId: ADMIN_ID,
        title,
        slug,
        content,
        category: category as any,
        universityId,
        coverImageUrl,
        tags,
        metadata,
        status: PostStatus.published,
        publishedAt: new Date(),
      }
    });
  }

  console.log('✅ Feed Posts populated');
  console.log('✨ Population complete!');
}

main()
  .catch((e) => {
    console.error('💥 Population failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
