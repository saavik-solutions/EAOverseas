import { prisma } from '../../lib/prisma';
import { Prisma } from '@prisma/client';

export class UniversityService {
  async getAll(query: { search?: string; country?: string }) {
    const where: any = {
      isActive: true,
    };

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { city: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.country && query.country !== 'All') {
      where.country = { contains: query.country, mode: 'insensitive' };
    }

    return await prisma.university.findMany({
      where,
      include: {
        courses: {
          include: {
            fees: true,
            requirements: true,
          }
        }
      },
      orderBy: { qsRanking: 'asc' },
    });
  }

  async getById(id: string) {
    return await prisma.university.findUnique({
      where: { id },
      include: {
        courses: {
          include: {
            fees: true,
            requirements: true,
          }
        },
        feedPosts: {
          where: { status: 'published' },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async getBySlug(slug: string) {
    return await prisma.university.findUnique({
      where: { slug },
      include: {
        courses: {
          include: {
            fees: true,
            requirements: true,
          }
        },
        feedPosts: {
          where: { status: 'published' },
          orderBy: { createdAt: 'desc' }
        }
      }
    });
  }

  async create(data: any) {
    return await prisma.university.create({
      data: {
        ...data,
        isActive: true,
      }
    });
  }

  async update(id: string, data: any) {
    return await prisma.university.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return await prisma.university.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
