import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface RemoveInscricaoRequest {
    atividade_id: string;
    participante_id: string;
}

class RemoveInscricaoService {
    async execute({ atividade_id, participante_id }: RemoveInscricaoRequest) {
        try {


            const removeInscricao = await prismaClient.inscricao.deleteMany({
                where: {
                    AND: [
                        { atividade_id: atividade_id },
                        { participante_id: participante_id }
                    ]
                }
            });

            const removeChekInOut = await prismaClient.checkIn.deleteMany({
                where: {
                    AND: [
                        { atividade_id: atividade_id },
                        { participante_id: participante_id }
                    ]
                }
            })

            if (removeInscricao.count === 0) {
                throw new AppError("Nehuma inscrição encontrada para remover", 404);

            }

            try {

                await prismaClient.atividade.update({
                    where: {
                        id: atividade_id
                    },
                    data: {
                        vagas: {
                            increment: 1
                        }
                    }
                });

                return "Inscrição removida com sucesso!";
            } catch (error) {
                return "Erro ao incrementar as vagas: " + error.message;
            }
        } catch (error) {
            return `Erro ao remover inscrição: ${error.message}`;
        }
    }
}

export { RemoveInscricaoService };
