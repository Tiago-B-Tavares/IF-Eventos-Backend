import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";


class GetUsersService {
    async execute() {
        try {

            const user = await prismaClient.organizador.findMany()

            return user

        } catch (error) {
            throw new AppError("Erro ao buscar dados do usuário",  500);
        }
    }
}
export { GetUsersService }