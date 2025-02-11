import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { AppError } from '../../ErrorControl/AppError';

interface UpdateWebUserRequest {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    googleId?: string;
}

class UpdateUserService {
    async execute({ id, nome, email, senha, googleId }: UpdateWebUserRequest) {
        try {
            // Verifica se o e-mail já está vinculado a outra conta
            if (email) {
                const emailAlreadyExists = await prismaClient.organizador.findUnique({
                    where: {
                        email: email,
                    },
                });

                // Se o e-mail já existe e não pertence ao mesmo usuário, lança um erro
                if (emailAlreadyExists && emailAlreadyExists.id !== id) {
                    throw new AppError("Email já vinculado a outra conta", 400);
                }
            }

            // Hash da senha, se fornecida
            let senhaHash;
            if (senha) {
                senhaHash = await hash(senha, 8);
            }

            // Atualiza o usuário
            const userUpdated = await prismaClient.organizador.update({
                where: {
                    id: id,
                },
                data: {
                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    googleId: googleId, 
                },
            });

          
            return userUpdated;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new AppError("Não foi possível atualizar os dados", 500);
        }
    }
}

export { UpdateUserService };