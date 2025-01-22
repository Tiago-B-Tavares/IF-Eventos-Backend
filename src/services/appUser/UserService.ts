import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import { AppError } from '../../ErrorControl/AppError';

interface CreateUserDTO {
    id: string;
    email: string;
    nome: string;
    senha?: string;
}

export class UserService {
    async createUser({ id, email, nome, senha }: CreateUserDTO) {
        try {
          console.log("service",id, email, nome, senha);
          
            const existingUser = await prismaClient.participante.findUnique({
                where: { id },
            });

            if (existingUser) {
                throw new AppError("Usuário já existe.", 400);
            }
            const senhaHash = senha ? await hash(senha, 8) : undefined;
            // Cria o novo usuário
            const user = await prismaClient.participante.create({
                data: {
                    id,
                    email,
                    nome: nome,
                    senha: 'defaultPassword', // Replace with actual password logic
                    idade: 0, // Replace with actual age logic
                    sexo: 'F', // Replace with actual gender logic
                },
            });

            return user;
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            throw new Error("Erro ao criar usuário.");
        }
    }
}
