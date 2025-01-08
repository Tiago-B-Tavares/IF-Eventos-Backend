import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";

interface AuthRequest {
  email: string;
  senha: string;
}

class AuthWebUserService {
  async execute({ email, senha }: AuthRequest) {
    console.log(email, senha);
    
    try {
      const user = await prismaClient.organizador.findFirst({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new AppError("Email ou senha incorretos!", 401);
      }

      const senhaMatch = await compare(senha, user.senha);

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

export { AuthWebUserService };
