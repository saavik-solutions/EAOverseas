import { FastifyReply, FastifyRequest } from 'fastify';
import { UniversityService } from './universities.service';

const universityService = new UniversityService();

export const getAllUniversities = async (request: FastifyRequest, reply: FastifyReply) => {
  const { search, country } = request.query as { search?: string; country?: string };
  const universities = await universityService.getAll({ search, country });
  return universities;
};

export const getUniversityByIdOrSlug = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  // Try ID first, then Slug
  let university = null;
  
  // UUID check for ID
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
  
  if (isUuid) {
    university = await universityService.getById(id);
  }
  
  if (!university) {
    university = await universityService.getBySlug(id);
  }

  if (!university) {
    return reply.status(404).send({ error: 'University not found' });
  }
  return university;
};

export const createUniversity = async (request: FastifyRequest, reply: FastifyReply) => {
  const university = await universityService.create(request.body);
  return reply.status(201).send(university);
};

export const updateUniversity = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const university = await universityService.update(id, request.body);
  return university;
};

export const deleteUniversity = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  await universityService.delete(id);
  return reply.status(204).send();
};
