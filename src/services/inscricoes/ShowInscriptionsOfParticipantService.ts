import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface showInscritosRequest {

    id: string;

}
class ShowInscriptionsOfParticipantService {
    async execute({ id }) {

        try {

            const inscritosList = await prismaClient.inscricao.findMany({
                where: {
                    participante_id: id
                },
                include: {
                    

                    atividade: {
                        select: {
                            nome: true,
                            descricao:true,
                            local:true,
                            horario:true,
                            vagas:true,
                            createdAt: true
                        },
                    },
                },
            });


            return inscritosList;


        } catch (error) {
            throw new AppError("Ocorreu um erro ao buscar as inscrições", 404);
        }
    }
}
export { ShowInscriptionsOfParticipantService }