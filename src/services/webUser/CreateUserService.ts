import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { Role } from '../../enums/permissionRoles'; 
import { AppError } from '../../ErrorControl/AppError';
import e from 'express';

interface WebUserRequest {
  nome: string;
  email: string;
  senha?: string;
  googleId?: string;
}

class CreateUserService {
  async execute({ nome, email, senha, googleId }: WebUserRequest) {

    try {
      
      if (!email) {
        throw new AppError("O campo email não pode estar vazio", 400);
      }

      const userAlreadyExists = await prismaClient.organizador.findUnique({
        where: { email:email }
      });

      if (userAlreadyExists) {
        throw new AppError("Email já cadastrado", 400);
      }

      const isFirstUser = await prismaClient.organizador.count();

      const senhaHash = senha ? await hash(senha, 8) : undefined;

      const user = await prismaClient.organizador.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          googleId,
          role: isFirstUser === 0 ? Role.SUPER_ADMIN : Role.ACTIVITIES_ADMIN,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          role: true,
        },
      });

      return user;
    } catch (error) {
      throw new AppError("Erro ao criar o usuário", 500);
    }
  }
}

export { CreateUserService };
