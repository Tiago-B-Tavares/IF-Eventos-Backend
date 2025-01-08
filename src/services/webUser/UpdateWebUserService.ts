import { hash } from 'bcryptjs';
import prismaClient from '../../prisma'
import { AppError } from '../../ErrorControl/AppError';

interface UpdateWebUserRequest {
    id: string;
    nome?: string;
    email?: string;
    senha?: string;
    googleId?: string;
}
class UpdateWebUserService {
    async execute({ id, nome, email, senha, googleId }: UpdateWebUserRequest) {

        try {
            const senhaHash = await hash(senha, 8)
            await prismaClient.organizador.update({
                where: {
                    id: id,
                },
                data: {
                    nome: nome,
                    email: email,
                    senha:senhaHash,
                    googleId:googleId
                }
            })
        } catch (error) {
            throw new AppError("Nao foi possivel atualizar o usuario", 500);
        }
    }
}

export { UpdateWebUserService }
