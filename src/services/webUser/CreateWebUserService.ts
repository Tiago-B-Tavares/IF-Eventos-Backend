import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { Role } from '../../enums/permissionRoles'; 
import { AppError } from '../../ErrorControl/AppError';

interface WebUserRequest {
  nome: string;
  email: string;
  senha?: string;
  googleId?: string;

}

class CreateWebUserService {
  async execute({ nome, email, senha, googleId }: WebUserRequest) {
   
    
    try {
      if (!email) {
        throw new AppError("Email o campo email não pode estar vazio", 400);
      }

      // Verifica se o usuário já existe
      const userAlreadyExists = await prismaClient.organizador.findFirst({
        where: { email }
      });

      const IsFirstUser = await prismaClient.organizador.findMany();


      if (userAlreadyExists) {
        throw new AppError("Email ja cadastrado", 400);
      }

      // Hash da senha apenas se fornecida
      const senhaHash = senha ? await hash(senha, 8) : undefined;

      // Criação do usuário
      const user = await prismaClient.organizador.create({
        data: {
          nome,
          email,
          senha: senhaHash,
          googleId,
          role: IsFirstUser.length === 0 ? Role.SUPER_ADMIN : Role.ACTIVITIES_ADMIN
        },
        select: {
          id: true,
          nome: true,
          email: true,
          role: true
        }
      });

      return user;
    } catch (error) {
      throw new AppError("Erro ao criar o usuário",  500);
    }
  }
}

export { CreateWebUserService };
