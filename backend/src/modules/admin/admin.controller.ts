import { FastifyRequest, FastifyReply } from 'fastify';
import { prisma, Role } from '../../lib/prisma';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
  const { role, page = 1, limit = 20, search } = request.query as any;

  try {
    const where: any = {};
    if (role && role !== 'all') {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { fullName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const users = await prisma.user.findMany({
      where,
      skip,
      take: Number(limit),
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        lastLoginAt: true,
      }
    });

    const total = await prisma.user.count({ where });

    return reply.send({
      data: users,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to fetch users', message: error.message });
  }
};

export const createUserAdmin = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password, fullName, role, phone } = request.body as any;

  if (!email || !password || !fullName || !role) {
    return reply.status(400).send({ error: 'Missing required fields' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return reply.status(409).send({ error: 'User with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: role as Role,
        phone,
        emailVerified: true, // Automatically bypass OTP for admin-created users
        isActive: true,
        authProvider: 'email'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
      }
    });

    return reply.status(201).send({
      message: 'User created successfully',
      user
    });
  } catch (error: any) {
    request.log.error(error);
    return reply.status(500).send({ error: 'Failed to create user', message: error.message });
  }
};

export const toggleUserStatus = async (request: FastifyRequest<{Params: {id: string}}>, reply: FastifyReply) => {
  const { id } = request.params;
  const { isActive } = request.body as any;

  try {
    // Prevent super_admin from deactivating themselves
    if (!request.user || request.user.id === id) {
      return reply.status(403).send({ error: 'Cannot deactivate yourself' });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true, isActive: true, email: true }
    });

    return reply.send({ message: 'User status updated', user });
  } catch (error: any) {
    return reply.status(500).send({ error: 'Failed to update user status', message: error.message });
  }
};
