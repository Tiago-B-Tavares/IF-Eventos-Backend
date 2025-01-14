import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

class GetUserProfileService {
    async execute(id: string) {
        try {
            const user = await prismaClient.organizador.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    nome: true,
                    email: true
                }
            })

            return user;
        } catch (error) {
            throw new AppError("Erro ao buscar o usuário",  500);
        }
    }
}

export { GetUserProfileService }