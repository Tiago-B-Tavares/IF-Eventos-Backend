import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface GetUserDataByIdRequest {
    id: string;
}

class GetUserDataByIdService {
    async execute({ id }) {
        try {
            const userData = await prismaClient.organizador.findFirst({
                where: {
                    id: id
                },
                select: {
                    id: true,
                    email: true,
                    nome: true,
                    role: true,
                    googleId: true,
                    createdAt: true,
                    updatedAt: true
                }
            })
            return {userData};
        } catch (error) {
           
            throw new AppError("Erro ao buscar dados do usuário",  500);
        }

    }
}
export { GetUserDataByIdService }