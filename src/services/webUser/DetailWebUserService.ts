import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

class DetailWebUSerService {
    async execute(user_id: string) {
        try {
            const user = await prismaClient.organizador.findFirst({
                where: {
                    id: user_id
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

export { DetailWebUSerService }