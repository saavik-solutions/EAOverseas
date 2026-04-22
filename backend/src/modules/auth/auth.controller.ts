import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthService } from './auth.service';

const authService = new AuthService();

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any;
  try {
    const user = await authService.login(email, password);
    const token = await reply.jwtSign({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    
    return { user, token };
  } catch (err: any) {
    return reply.status(401).send({ error: err.message });
  }
};

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const user = await authService.register(request.body as any);
    const token = await reply.jwtSign({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
    return reply.status(201).send({ user, token });
  } catch (err: any) {
    return reply.status(400).send({ error: err.message });
  }
};

export const googleAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await authService.googleAuth(request.body as any) as any;
    
    // If it's a new user, return data for frontend to complete signup
    if (result.isNewUser) {
      return result;
    }

    const token = await reply.jwtSign({ 
      id: result.id, 
      email: result.email, 
      role: result.role 
    });
    return { user: result, token };
  } catch (err: any) {
    return reply.status(400).send({ error: err.message });
  }
};

export const me = async (request: FastifyRequest, reply: FastifyReply) => {
  return request.user;
};

export const verifyOtp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { otp } = request.body as any;
    const userId = (request.user as any).id;
    await authService.verifyOTP(userId, otp);
    return { success: true, message: 'Email verified successfully' };
  } catch (err: any) {
    return reply.status(400).send({ error: err.message });
  }
};

export const resendOtp = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const userId = (request.user as any).id;
    await authService.resendOTP(userId);
    return { success: true, message: 'New verification code sent' };
  } catch (err: any) {
    return reply.status(400).send({ error: err.message });
  }
};
