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
class UpdateUserService {
    async execute({ id, nome, email, senha, googleId }: UpdateWebUserRequest) {

        try {

            const senhaHash = await hash(senha, 8)

            const userUpdated = await prismaClient.organizador.update({
                where: {
                    id: id,
                },
                data: {

                    nome: nome,
                    email: email,
                    senha: senhaHash,
                    googleId: googleId
                }
            })
            return userUpdated
        } catch (error) {
            throw new AppError("Não foi possivel atualizar os dados", 500);
        }
    }
}

export { UpdateUserService }
