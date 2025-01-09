import { AppError } from "../../ErrorControl/AppError";
import prismaClient from "../../prisma";

interface CreateInscricaoRequest {
    atividade_id: string;
    participante_id: string;
}

class CreateInscricaoService {
    async execute({ atividade_id, participante_id }: CreateInscricaoRequest) {
        try {
            const existeInscricao = await prismaClient.inscricao.findFirst({
                where: { atividade_id, participante_id },
            });

            if (existeInscricao) {
                throw new AppError("Você já está inscrito nesta atividade.", 400);
            }

            const participante = await prismaClient.participante.findUnique({
                where: { id: participante_id },
            });

            if (!participante) {
                throw new AppError("Participante não encontrado.", 404);
            }

            const atividade = await prismaClient.atividade.findUnique({
                where: { id: atividade_id },
            });

            if (!atividade) {
                throw new AppError("Atividade não encontrada.", 404);
            }

            if (atividade.vagas <= 0) {
                throw new AppError("Atividade sem vagas disponíveis.", 400);
            }

            const inscricao = await prismaClient.inscricao.create({
                data: {
                    atividade_id: atividade_id,
                    participante_id: participante_id,
                },
            });

            await prismaClient.atividade.update({
                where: { id: atividade_id },
                data: { vagas: { decrement: 1 } },
            });

            return inscricao;
        } catch (error) {
            if (error instanceof AppError) {
                throw error;
            }

            console.error("Erro interno ao criar inscrição:", error);
            throw new AppError("Erro interno no servidor.", 500);
        }
    }
}

export { CreateInscricaoService };
