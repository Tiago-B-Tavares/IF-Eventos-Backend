import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";


class GetDataUserService {
    async execute() {
        try {
            const userData = await prismaClient.organizador.findMany()
            return userData
        } catch (error) {
            throw new AppError("Erro ao buscar dados do usuário",  500);
        }
    }
}
export { GetDataUserService }