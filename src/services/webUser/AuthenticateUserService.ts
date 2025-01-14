import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: AuthRequest) {
   
    
    try {
      const user = await prismaClient.organizador.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new AppError("Email ou senha incorretos!", 401);
      }

      const senhaMatch = await compare(password, user.senha);

      if (!senhaMatch) {
        throw new AppError("Email ou senha incorretos!", 401);
      }

      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
      };
    } catch (error) {
      throw new AppError("Erro ao autenticar o usuário!", 500);
    }
  }
}

export { AuthenticateUserService };
