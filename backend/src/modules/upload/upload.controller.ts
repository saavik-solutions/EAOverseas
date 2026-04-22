import { FastifyReply, FastifyRequest } from 'fastify';
import { UploadService } from './upload.service';

const uploadService = new UploadService();

export const uploadFile = async (request: FastifyRequest, reply: FastifyReply) => {
  const data = await request.file();
  if (!data) {
    return reply.status(400).send({ error: 'No file uploaded' });
  }

  const url = await uploadService.saveFile(data);
  return { url };
};
